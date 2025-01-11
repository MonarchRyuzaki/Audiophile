export function selectImage(desktopImage, tabletImage, mobileImage) {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1024) {
    return desktopImage;
  } else if (screenWidth >= 600) {
    return tabletImage;
  } else {
    return mobileImage;
  }
}
