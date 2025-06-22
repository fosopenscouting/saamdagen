import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

const defaultHeaderStyles = (size: number) => ({
  fontFamily: 'Quicksand_600SemiBold',
  fontSize: size,
  marginBottom: 4,
});
const debugBorder = (color = 'red') => ({
  borderWidth: 1,
  borderColor: color,
});

const defaultStyles: StyleSheet.NamedStyles<any> = {
  block: {
    marginBottom: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  blockQuote: {
    borderLeftWidth: 5,
    borderLeftColor: Colors.FOSCOLORS.FOS_BLUE_DARKENED,
    backgroundColor: Colors.FOSCOLORS.FOS_BLUE,
    paddingLeft: 10,
  },
  blockQuoteText: {
    color: '#ffffff',
  },
  h1: {
    ...defaultHeaderStyles(21),
  },
  h2: {
    ...defaultHeaderStyles(20),
  },
  h3: {
    ...defaultHeaderStyles(19),
  },
  h4: {
    ...defaultHeaderStyles(18),
  },
  h5: {
    ...defaultHeaderStyles(17),
  },
  h6: {
    ...defaultHeaderStyles(16),
  },
  hr: {
    alignSelf: 'stretch',
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 8,
  },
  pre: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  code: {
    backgroundColor: '#333333',
    color: 'orange',
  },
  text: {
    color: 'red',
    alignSelf: 'flex-start',
    textAlign: 'justify',
  },
  strong: {
    fontFamily: 'Quicksand_600SemiBold',
    fontWeight: 'bold',
  },
  em: {
    fontStyle: 'italic',
  },
  del: {
    textDecorationLine: 'line-through',
  },
  u: {
    textDecorationLine: 'underline',
  },
  linkWrapper: {
    textDecorationLine: 'underline',
    alignSelf: 'flex-start',
  },
  link: {
    textDecorationLine: 'underline',
    alignSelf: 'flex-start',
  },
  list: {},
  listItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 5,
  },
  listItemContent: {
    flexDirection: 'column',
    flexShrink: 1,
    justifyContent: 'flex-start',
  },
  listItemBullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 8,
    marginRight: 10,
  },
  listItemNumber: {
    marginRight: 10,
  },
  imageWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  image: {
    flex: 1,
    minWidth: 200,
    height: 200,
  },

  // Tables
  table: {
    borderWidth: 1,
    borderColor: Colors.light.muted,
    marginVertical: 4,
    borderRadius: 3,
  },
  thead: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    backgroundColor: Colors.FOSCOLORS.FOS_BLUE,
  },
  tbody: {},
  th: {
    flex: 1,
    padding: 5,
    fontFamily: 'Quicksand_600SemiBold',
    color: 'white',
  },
  tr: {
    borderBottomWidth: 1,
    borderColor: Colors.light.muted,
    flexDirection: 'row',
  },
  td: {
    flex: 1,
    padding: 5,
  },
};

export default defaultStyles;
