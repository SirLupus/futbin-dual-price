# FUTBIN Dual Price Box & Graph Displayer

A powerful userscript that enhances FUTBIN player pages by displayin### 🐛 Bug Reports## 🐛 Bug Reports & Feature Requests

Found a bug or have an idea? Please [open an issue](https://github.com/SirLupus/futbin-dual-price/issues) with:

- **For bugs**: Steps to reproduce, expected vs actual behavior, browser & userscript manager versions
- **For features**: Clear description of the desired functionality

## ❓ Troubleshooting

### Script Not Working?

1. **Check if enabled**: Open your userscript manager and ensure the script is enabled
2. **Developer mode** (Chrome only): Go to `chrome://extensions/` and enable Developer mode toggle
3. **Clear cache**: Clear browser cache and reload the FUTBIN player page
4. **Check URL**: Script only works on player pages: `https://www.futbin.com/*/player/*`
5. **Browser console**: Press F12 and check for any error messages

### Settings Button Not Appearing?

- The ⚙️ Platforms button appears in the top-right corner
- Try refreshing the page (F5)
- Check if the script is enabled in your userscript manager

Found a bug or have an idea? Please [open an issue](https://github.com/SirLupus/futbin-dual-price/issues) with console and PC prices side-by-side with fully customizable platform visibility and ordering.

![Version](https://img.shields.io/badge/version-6.0-blue)
![License](https://img.shields.io/badge/license-CC--BY--NC--SA--4.0-green)
![Platform](https://img.shields.io/badge/platform-Tampermonkey%20%7C%20Violentmonkey-orange)

## ✨ Features

- **Dual Platform Price Boxes**: View Console (PS/Xbox) and PC prices simultaneously
- **Side-by-Side Layout**: Compact display showing both platforms at once
- **Vertical Graph Display**: Price history graphs stacked for easy comparison
- **Fully Customizable**:
  - Show both platforms, console only, or PC only
  - Choose display order (Console first or PC first)
  - Separate settings for price boxes and graphs
- **Persistent Configuration**: Settings saved automatically and persist across sessions
- **Hover Card Support**: Works seamlessly with alternate player cards (e.g., Cornerstones)
- **Clean UI**: Intuitive settings panel with visual platform icons
- **Zero Performance Impact**: Lightweight implementation with smart DOM observation

## 📸 Screenshots

### Settings Panel
Click the ⚙️ Platforms button to configure your preferences:

![Settings Panel](https://raw.githubusercontent.com/SirLupus/futbin-dual-price/main/screenshots/settings-panel.png)

### Side-by-Side Price Boxes
View Console and PC prices simultaneously:

![Price Boxes](https://raw.githubusercontent.com/SirLupus/futbin-dual-price/main/screenshots/price-boxes.png)

### Vertical Graph Display
Price history graphs stacked for easy comparison:

![Price Graphs](https://raw.githubusercontent.com/SirLupus/futbin-dual-price/main/screenshots/price-graphs.png)

### Full Overview
Complete view showing all features in action:

![Full Overview](https://raw.githubusercontent.com/SirLupus/futbin-dual-price/main/screenshots/full-overview.png)

## 🚀 Installation

### Prerequisites
You need a userscript manager installed in your browser:

- **[Tampermonkey](https://www.tampermonkey.net/)** (Chrome, Firefox, Safari, Edge, Opera)
- **[Violentmonkey](https://violentmonkey.github.io/)** (Chrome, Firefox, Edge)
- **[Greasemonkey](https://www.greasespot.net/)** (Firefox only)

### Install Script

1. **Install a userscript manager** (if you haven't already)
2. **Click the install link**:
   - [📥 Install from GitHub](https://github.com/SirLupus/futbin-dual-price/raw/main/FutbinDualPriceBox.user.js)
   - Or manually copy the script content and create a new userscript
3. **Confirm installation** in your userscript manager
4. **Visit any FUTBIN player page** - the script will activate automatically!

### ⚠️ Chrome Users: Enable Developer Mode

If you see a "Please enable developer mode" message in Tampermonkey/Violentmonkey:

1. Go to `chrome://extensions/` in your Chrome address bar
2. Toggle **Developer mode** ON (top-right corner)
3. Refresh the FUTBIN page
4. **Note**: This is safe - it only allows Chrome extensions to inject scripts properly

**Why is this needed?** Chrome restricts userscript injection for security. Enabling developer mode in Chrome's extensions page allows Tampermonkey/Violentmonkey to function properly.

## 📖 Usage

### Opening Settings
1. Navigate to any FUTBIN player page (e.g., `https://www.futbin.com/25/player/276/cristiano-ronaldo`)
2. Look for the **⚙️ Platforms** button in the top-right corner
3. Click to open the settings panel

### Configuration Options

#### Price Boxes
- **Both (Console & PC)**: Display both platforms side-by-side
- **Console Only**: Show only PlayStation/Xbox prices
- **PC Only**: Show only PC prices

#### Price Boxes Order
- **Console First**: Display console prices on the left
- **PC First**: Display PC prices on the left

#### Price Graphs
- **Both (Console & PC)**: Show both platform graphs vertically stacked
- **Console Only**: Show only console price history
- **PC Only**: Show only PC price history

#### Price Graphs Order
- **Console First**: Display console graph on top
- **PC First**: Display PC graph on top

### Applying Changes
1. Select your preferred options
2. Click **Apply** - the page will reload with your new settings
3. Settings are automatically saved and will persist across all FUTBIN player pages

## 🛠️ Technical Details

- **Language**: JavaScript (ES6+)
- **Storage**: Uses `GM_getValue` and `GM_setValue` for persistent configuration
- **DOM Handling**: Smart MutationObserver for dynamic content (hover cards)
- **Styling**: Inline CSS with Flexbox for responsive layouts
- **Performance**: Minimal overhead with efficient DOM manipulation

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Maintain clean, readable code
- Test on multiple FUTBIN player pages
- Ensure compatibility with both Tampermonkey and Violentmonkey
- Update version number for significant changes

## 🐛 Bug Reports & Feature Requests

Found a bug or have an idea? Please [open an issue](https://github.com/YOUR_USERNAME/futbin-dual-price/issues) with:

- **For bugs**: Steps to reproduce, expected vs actual behavior, browser & userscript manager versions
- **For features**: Clear description of the desired functionality

## 📝 Changelog

### Version 6.0 (2025-10-08)
- ✨ Added order configuration for price boxes (Console first vs PC first)
- ✨ Added order configuration for graphs (Console first vs PC first)
- 🎨 Enhanced configuration panel with 4 customization options
- 🐛 Fixed hover card display issues
- ♻️ Code refactoring with improved helper functions
- 📚 Complete documentation and licensing

### Version 5.0
- ✨ Added configuration UI with persistent settings
- ✨ Added support for hover-over alternate player cards
- 🎨 Improved layout and styling

### Version 4.0
- ✨ Vertical graph display implementation
- ♻️ Code optimization and cleanup

### Earlier Versions
- Initial implementation of dual price boxes
- Side-by-side layout
- Basic platform switching

## 📄 License

This project is licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License** (CC BY-NC-SA 4.0).

[![CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/4.0/)

### You are free to:
- **Share**: Copy and redistribute the material in any medium or format
- **Adapt**: Remix, transform, and build upon the material

### Under the following terms:
- **Attribution**: You must give appropriate credit to Lupus and indicate if changes were made
- **NonCommercial**: You may not use the material for commercial purposes
- **ShareAlike**: If you remix or build upon the material, you must distribute your contributions under the same license

[Full License Text](http://creativecommons.org/licenses/by-nc-sa/4.0/)

## 👤 Author

**Lupus**

- GitHub: [@SirLupus](https://github.com/SirLupus)

## 🤖 Development

This project was entirely developed using AI assistance (GitHub Copilot + Claude). It showcases the potential of AI-powered development for creating fully functional, production-ready userscripts with:
- Clean, well-documented code
- Comprehensive error handling
- Persistent configuration management
- Responsive UI design
- Full licensing and documentation

## ⭐ Support

If you find this script useful, please consider:
- ⭐ **Starring the repository** on GitHub
- 🐛 **Reporting bugs** to help improve the script
- 💡 **Suggesting features** for future updates
- 📢 **Sharing with other FIFA/FC players** who use FUTBIN

## 🙏 Acknowledgments

- FUTBIN for providing an excellent platform for FIFA/FC Ultimate Team players
- The userscript community for tools and inspiration

---

**Disclaimer**: This userscript is not affiliated with, endorsed by, or connected to FUTBIN or EA Sports. It's a community tool designed to enhance the user experience on FUTBIN.
