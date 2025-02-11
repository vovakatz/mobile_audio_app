const Icon = () => null;

Icon.getRawGlyphMap = () => ({});
Icon.getFontFamily = () => '';
Icon.loadFont = () => Promise.resolve();
Icon.hasIcon = () => true;
Icon.getImageSource = () => Promise.resolve({});
Icon.getImageSourceSync = () => ({});

export default Icon;
