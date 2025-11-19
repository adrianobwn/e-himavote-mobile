/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';


export const background = {
  light: {
    background: '#97B2DE',
    icon: '#687076',
    tabIconDefault: '#687076',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    Black: 'OutrequeBlack',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    Bold: 'OutrequeBold',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    Medium: 'OutrequeMedium',
  },
  default: {
    Black: 'OutrequeBlack',
    Bold: 'OutrequeBold',
    Medium: 'OutrequeMedium',
  },
  web: {
    Black: "OutrequeBlack",
    Bold: "OutrequeBold",
    Medium: "OutrequeMedium",
  },
});
