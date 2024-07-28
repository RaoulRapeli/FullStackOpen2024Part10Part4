import Constants from 'expo-constants';
import { Platform } from 'react-native';

const colors = {
  textPrimary: '#24292e',
  textSecondary: '#586069',
  primary: '#0366d6',
  white: '#FFFFFF',
  black: '#000000',
  background: '#e1e4e8',
  blue: '#0366d6',
  red: '#d73a4a'
}

const fonts = {
  android: 'Roboto',
  ios: 'Arial',
  default: 'System'
}

const customHeaders = {
  h1: {
    fontWeight: 'bold',
    fontSize: 18
  },
}

const fontFamily = {
  fontFamily: Platform.select({
    android: fonts.android,
    ios: fonts.ios,
    default: fonts.default
  }),
}

const theme = {
  container: {
    paddingTop: Constants.statusBarHeight + 20,
    paddingLeft: 10,
    paddingBottom: 20,
    backgroundColor: colors.textPrimary,
  },
  colors: {
    textPrimary: colors.textPrimary,
    textSecondary: colors.textSecondary,
    primary: colors.primary,
    white: colors.white,
    black: colors.black,
    backgroundColor: colors.background,
    blue: colors.blue,
    red: colors.red,
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    android: fonts.android,
    ios: fonts.ios,
    default: fonts.ios
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  flexContainer: {
    display: 'flex',
    padding: 10,
    gap: 5,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,

  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  customHeaders: {
    h1: customHeaders.h1,
  },
  input: {
    flexShrink: 1,
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    margin: 10,
    borderColor: "gray",
    borderRadius: 5,
  },
  submitButton: {
    display: 'flex',
    flexShrink: 1,
    padding: 5,
    paddingTop: 20,
    paddingBottom: 20,
    margin: 10,
    fontSize: 18,
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: colors.blue,
    color: colors.white,
  },
  buttonLayout: {
    flexShrink: 1,
    flexGrow: 1,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
    borderRadius: 5,
    color: "white",
    textAlign: "center"
  }
};



export default theme;