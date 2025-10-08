// ==UserScript==
// @name        FUTBIN Dual Price Box & Graph Displayer
// @namespace   Violentmonkey Scripts
// @match       https://www.futbin.com/*/player/*
// @grant       GM_getValue
// @grant       GM_setValue
// @version     6.0
// @author      Lupus
// @description Displays FUTBIN player page price boxes side-by-side and price graphs vertically. Fully configurable platform display and order settings.
// @license     CC-BY-NC-SA-4.0
// ==/UserScript==

/*
 * FUTBIN Dual Price Box & Graph Displayer
 * Copyright (c) 2025 Lupus
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0
 * International License. To view a copy of this license, visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 *
 * You are free to:
 * - Share: copy and redistribute the material in any medium or format
 * - Adapt: remix, transform, and build upon the material
 *
 * Under the following terms:
 * - Attribution: You must give appropriate credit to Lupus, provide a link to the license,
 *   and indicate if changes were made.
 * - NonCommercial: You may not use the material for commercial purposes.
 * - ShareAlike: If you remix, transform, or build upon the material, you must distribute
 *   your contributions under the same license as the original.
 *
 * ============================================================================
 * USAGE:
 * - Click the "⚙️ Platforms" button in the top-right to open settings
 * - Configure which platforms to show for price boxes and graphs
 * - Set the display order (Console first or PC first) for each
 * - Settings are automatically saved and persist across page reloads
 * - Works with hover-over alternate player cards (e.g., Cornerstones)
 * ============================================================================
 */
(function() {
    'use strict';

    // Standardkonfiguration
    const DEFAULT_CONFIG = {
        priceBoxes: 'both',          // 'console', 'pc', 'both'
        graphs: 'both',              // 'console', 'pc', 'both'
        priceBoxesOrder: 'console',  // 'console', 'pc' (which one first)
        graphsOrder: 'console'       // 'console', 'pc' (which one first)
    };

    // Konfiguration laden
    function loadConfig() {
        return {
            priceBoxes: GM_getValue('priceBoxes', DEFAULT_CONFIG.priceBoxes),
            graphs: GM_getValue('graphs', DEFAULT_CONFIG.graphs),
            priceBoxesOrder: GM_getValue('priceBoxesOrder', DEFAULT_CONFIG.priceBoxesOrder),
            graphsOrder: GM_getValue('graphsOrder', DEFAULT_CONFIG.graphsOrder)
        };
    }

    // Konfiguration speichern
    function saveConfig(config) {
        GM_setValue('priceBoxes', config.priceBoxes);
        GM_setValue('graphs', config.graphs);
        GM_setValue('priceBoxesOrder', config.priceBoxesOrder);
        GM_setValue('graphsOrder', config.graphsOrder);
    }

    // Aktuelle Konfiguration
    let config = loadConfig();

    // Erstellt das Konfigurations-Panel
    function createConfigPanel() {
        if (document.getElementById('futbin-config-panel')) return;

        const panel = document.createElement('div');
        panel.id = 'futbin-config-panel';
        panel.innerHTML = `
            <style>
                #futbin-config-panel {
                    position: fixed;
                    top: 80px;
                    right: 20px;
                    background: #1a1a1a;
                    border: 2px solid #333;
                    border-radius: 8px;
                    padding: 15px;
                    z-index: 10000;
                    color: #fff;
                    font-family: Arial, sans-serif;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
                    min-width: 280px;
                }
                #futbin-config-panel h3 {
                    margin: 0 0 15px 0;
                    font-size: 16px;
                    border-bottom: 1px solid #444;
                    padding-bottom: 10px;
                }
                .config-section {
                    margin-bottom: 15px;
                }
                .config-section label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                    font-size: 13px;
                    color: #aaa;
                }
                .config-section select {
                    width: 100%;
                    padding: 8px;
                    background: #2a2a2a;
                    border: 1px solid #444;
                    border-radius: 4px;
                    color: #fff;
                    font-size: 13px;
                }
                .config-section select:hover {
                    border-color: #666;
                }
                .config-buttons {
                    display: flex;
                    gap: 10px;
                    margin-top: 15px;
                }
                .config-buttons button {
                    flex: 1;
                    padding: 8px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: bold;
                }
                .btn-apply {
                    background: #4CAF50;
                    color: white;
                }
                .btn-apply:hover {
                    background: #45a049;
                }
                .btn-close {
                    background: #666;
                    color: white;
                }
                .btn-close:hover {
                    background: #555;
                }
                #futbin-config-toggle {
                    position: fixed;
                    top: 80px;
                    right: 20px;
                    background: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    padding: 10px 15px;
                    cursor: pointer;
                    z-index: 9999;
                    font-weight: bold;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                }
                #futbin-config-toggle:hover {
                    background: #45a049;
                }
            </style>
            <h3>⚙️ Platform Settings</h3>
            <div class="config-section">
                <label>Price Boxes:</label>
                <select id="priceBoxesSelect">
                    <option value="both">Both (Console & PC)</option>
                    <option value="console">Console Only</option>
                    <option value="pc">PC Only</option>
                </select>
            </div>
            <div class="config-section">
                <label>Price Boxes Order:</label>
                <select id="priceBoxesOrderSelect">
                    <option value="console">Console First</option>
                    <option value="pc">PC First</option>
                </select>
            </div>
            <div class="config-section">
                <label>Price Graphs:</label>
                <select id="graphsSelect">
                    <option value="both">Both (Console & PC)</option>
                    <option value="console">Console Only</option>
                    <option value="pc">PC Only</option>
                </select>
            </div>
            <div class="config-section">
                <label>Price Graphs Order:</label>
                <select id="graphsOrderSelect">
                    <option value="console">Console First</option>
                    <option value="pc">PC First</option>
                </select>
            </div>
            <div class="config-buttons">
                <button class="btn-apply" id="applyConfig">Apply</button>
                <button class="btn-close" id="closeConfig">Close</button>
            </div>
        `;

        document.body.appendChild(panel);

        // Setze aktuelle Werte
        document.getElementById('priceBoxesSelect').value = config.priceBoxes;
        document.getElementById('graphsSelect').value = config.graphs;
        document.getElementById('priceBoxesOrderSelect').value = config.priceBoxesOrder;
        document.getElementById('graphsOrderSelect').value = config.graphsOrder;

        // Event Listeners
        document.getElementById('applyConfig').addEventListener('click', () => {
            config.priceBoxes = document.getElementById('priceBoxesSelect').value;
            config.graphs = document.getElementById('graphsSelect').value;
            config.priceBoxesOrder = document.getElementById('priceBoxesOrderSelect').value;
            config.graphsOrder = document.getElementById('graphsOrderSelect').value;
            saveConfig(config);
            panel.style.display = 'none';
            location.reload(); // Seite neu laden, um Änderungen anzuwenden
        });

        document.getElementById('closeConfig').addEventListener('click', () => {
            panel.style.display = 'none';
        });

        panel.style.display = 'none'; // Initial versteckt
    }

    // Erstellt den Toggle-Button
    function createToggleButton() {
        if (document.getElementById('futbin-config-toggle')) return;

        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'futbin-config-toggle';
        toggleBtn.textContent = '⚙️ Platforms';
        toggleBtn.addEventListener('click', () => {
            const panel = document.getElementById('futbin-config-panel');
            if (panel) {
                panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
            }
        });

        document.body.appendChild(toggleBtn);
    }

    // Hilfsfunktion zum Erstellen von Platform-Icons
    function createPlatformIcons(platform) {
        const iconContainer = document.createElement('div');
        iconContainer.style.display = 'flex';
        iconContainer.style.alignItems = 'center';
        iconContainer.style.gap = '5px';
        iconContainer.style.paddingLeft = '10px';

        if (platform === 'console') {
            iconContainer.innerHTML = `
                <img src="https://cdn.futbin.com/design/img/logos/small/ps_blue.png" style="width:20px; height:20px;" alt="Console">
                <img src="https://cdn.futbin.com/design/img/logos/small/xbox_green.png" style="width:20px; height:20px;" alt="Console">
            `;
        } else {
            iconContainer.innerHTML = `
                <img src="https://cdn.futbin.com/design/img/logos/small/pc_blue.png" style="width:20px; height:20px;" alt="PC">
            `;
        }

        return iconContainer;
    }

    // Funktion, um eine einzelne Preis-Box zu behandeln
    function processPriceBox(box, platform) {
        if (!box) return;

        if (config.priceBoxes === 'both' || config.priceBoxes === platform) {
            box.classList.remove(platform === 'console' ? 'platform-ps-only' : 'platform-pc-only');
            box.classList.add(`futbin-script-${platform}-visible`);

            const header = box.querySelector('.price-header');
            if (header && !header.querySelector(`.platform-icons-${platform}`)) {
                const dropdown = header.querySelector('.platform-price-box');
                if (dropdown) {
                    dropdown.style.display = 'none';
                }
                const icons = createPlatformIcons(platform);
                icons.classList.add(`platform-icons-${platform}`);
                header.prepend(icons);
            }
        } else {
            box.style.display = 'none';
        }
    }

    // Funktion, um Preis-Boxen basierend auf Konfiguration anzuzeigen
    function displayPriceBoxes() {
        const pricesSection = document.querySelector('.player-header-prices-section');
        if (!pricesSection) return;

        if (pricesSection.classList.contains('dual-prices-active')) {
            return;
        }

        // Findet ALLE Boxen (Haupt + Hover)
        const consoleBoxes = pricesSection.querySelectorAll('.platform-ps-only');
        const pcBoxes = pricesSection.querySelectorAll('.platform-pc-only');

        // Behandelt alle Console-Boxen
        consoleBoxes.forEach(box => processPriceBox(box, 'console'));

        // Behandelt alle PC-Boxen
        pcBoxes.forEach(box => processPriceBox(box, 'pc'));

        // Setzt Flexbox-Layout und Order
        if (config.priceBoxes === 'both') {
            pricesSection.style.display = 'flex';
            pricesSection.style.gap = '1rem';

            // Setzt die Reihenfolge basierend auf Konfiguration
            consoleBoxes.forEach(box => {
                box.style.order = config.priceBoxesOrder === 'console' ? '1' : '2';
            });
            pcBoxes.forEach(box => {
                box.style.order = config.priceBoxesOrder === 'console' ? '2' : '1';
            });
        }

        pricesSection.classList.add('dual-prices-active');
    }    // Funktion, um Preis-Graphen basierend auf Konfiguration anzuzeigen
    function displayPriceGraphs() {
        const graphsWrapper = document.querySelector('.price-graphs-wrapper-new');
        if (!graphsWrapper) {
            return;
        }

        // Findet alle price-graph-tab Container
        const allTabs = document.querySelectorAll('.price-graph-tab');

        allTabs.forEach(tab => {
            // Überspringe bereits verarbeitete Tabs
            if (tab.classList.contains('dual-graphs-processed')) {
                return;
            }

            // Sammelt alle Graphen mit ihren Labels (für jedes Tab separat)
            const psGraphs = tab.querySelectorAll('.highcharts-graph-wrapper.platform-ps-only');
            const pcGraphs = tab.querySelectorAll('.highcharts-graph-wrapper.platform-pc-only');

            // Console-Graphen verarbeiten
            psGraphs.forEach(graph => {
                if (config.graphs === 'both' || config.graphs === 'console') {
                    graph.classList.remove('platform-ps-only');
                    graph.style.width = '100%';
                    graph.style.marginBottom = '1.5rem';
                    graph.style.display = 'block';

                    // Fügt Console-Label hinzu, wenn noch nicht vorhanden
                    let label = graph.previousElementSibling;
                    if (!label || !label.classList.contains('platform-label-console')) {
                        // Entfernt alle vorhandenen Labels dieses Typs im Parent, um Duplikate zu verhindern
                        const existingLabels = graph.parentNode.querySelectorAll('.platform-label-console');
                        existingLabels.forEach(el => {
                            if (el !== label) el.remove();
                        });
                        label = createPlatformLabel('console');
                        graph.parentNode.insertBefore(label, graph);
                    }
                } else {
                    graph.style.display = 'none';
                }
            });

            // PC-Graphen verarbeiten
            pcGraphs.forEach(graph => {
                if (config.graphs === 'both' || config.graphs === 'pc') {
                    graph.classList.remove('platform-pc-only');
                    graph.style.width = '100%';
                    graph.style.marginBottom = '1.5rem';
                    graph.style.display = 'block';

                    // Fügt PC-Label hinzu, wenn noch nicht vorhanden
                    let label = graph.previousElementSibling;
                    if (!label || !label.classList.contains('platform-label-pc')) {
                        // Entfernt alle vorhandenen Labels dieses Typs im Parent, um Duplikate zu verhindern
                        const existingLabels = graph.parentNode.querySelectorAll('.platform-label-pc');
                        existingLabels.forEach(el => {
                            if (el !== label) el.remove();
                        });
                        label = createPlatformLabel('pc');
                        graph.parentNode.insertBefore(label, graph);
                    }
                } else {
                    graph.style.display = 'none';
                }
            });

            // Sortiert die Graphen basierend auf der Konfiguration mit CSS order
            if (config.graphs === 'both') {
                // Verwende CSS order statt DOM-Manipulation, um Graphen in Reihenfolge anzuzeigen
                psGraphs.forEach(graph => {
                    graph.style.order = config.graphsOrder === 'console' ? '1' : '2';
                    // Finde das zugehörige Label
                    const label = graph.previousElementSibling;
                    if (label && label.classList.contains('platform-label-console')) {
                        label.style.order = config.graphsOrder === 'console' ? '1' : '2';
                    }
                });

                pcGraphs.forEach(graph => {
                    graph.style.order = config.graphsOrder === 'console' ? '2' : '1';
                    // Finde das zugehörige Label
                    const label = graph.previousElementSibling;
                    if (label && label.classList.contains('platform-label-pc')) {
                        label.style.order = config.graphsOrder === 'console' ? '2' : '1';
                    }
                });

                // Setze Flexbox auf dem Tab-Container für die Order-Eigenschaft
                tab.style.display = 'flex';
                tab.style.flexDirection = 'column';
            }

            // Markiere dieses Tab als verarbeitet
            tab.classList.add('dual-graphs-processed');
        });
    }

    // Hilfsfunktion zum Erstellen von Platform-Labels
    function createPlatformLabel(platform) {
        const label = document.createElement('div');
        label.classList.add(`platform-label-${platform}`);
        label.style.fontWeight = 'bold';
        label.style.marginBottom = '0.1rem';
        label.style.marginTop = platform === 'pc' ? '1rem' : '0';
        label.style.display = 'flex';
        label.style.alignItems = 'center';
        label.style.gap = '5px';

        if (platform === 'console') {
            label.innerHTML = `
                <img src="https://cdn.futbin.com/design/img/logos/small/ps_blue.png" style="width:18px; height:18px;" alt="Console">
                <img src="https://cdn.futbin.com/design/img/logos/small/xbox_green.png" style="width:18px; height:18px;" alt="Console">
                <span>Console Price</span>
            `;
        } else {
            label.innerHTML = `
                <img src="https://cdn.futbin.com/design/img/logos/small/pc_blue.png" style="width:18px; height:18px;" alt="PC">
                <span>PC Price</span>
            `;
        }

        return label;
    }

    // MutationObserver für dynamisch geladene Inhalte
    const observer = new MutationObserver(() => {
        const pricesSection = document.querySelector('.player-header-prices-section');
        if (pricesSection && pricesSection.querySelector('.price-box')) {
            // Entfernt das Flag, damit neue Boxen (z.B. durch Hover) auch behandelt werden
            if (pricesSection.classList.contains('dual-prices-active')) {
                pricesSection.classList.remove('dual-prices-active');
            }
            displayPriceBoxes();
        }

        const graphsWrapper = document.querySelector('.price-graphs-wrapper-new');
        if (graphsWrapper && graphsWrapper.querySelector('.highcharts-graph-wrapper')) {
            // Prozessiert nur neue/unverarbeitete Tabs
            displayPriceGraphs();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Initialisierung
    function init() {
        createConfigPanel();
        createToggleButton();
        displayPriceBoxes();
        displayPriceGraphs();
    }

    // Führt die Initialisierung aus
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
