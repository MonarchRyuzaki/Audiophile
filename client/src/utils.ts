export function selectImage(desktopImage: string, tabletImage: string, mobileImage: string) {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 1024) {
    return desktopImage;
  } else if (screenWidth >= 600) {
    return tabletImage;
  } else {
    return mobileImage;
  }
}
