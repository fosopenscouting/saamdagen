const defaultStyles = {
  block: {
    marginBottom: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  blockQuote: {
    borderLeftWidth: 5,
    borderLeftColor: '#aaaaaa',
    backgroundColor: '#cccccc',
    paddingLeft: 10,
  },
  h1: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 8,
  },
  h2: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  h3: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  h4: {
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  h5: {
    fontSize: 20,
    marginTop: 12,
    marginBottom: 6,
  },
  h6: {
    fontSize: 20,
    marginTop: 12,
    marginBottom: 6,
  },
  hr: {
    alignSelf: 'stretch',
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 8,
  },
  code: {
    backgroundColor: '#333333',
    color: 'orange',
  },
  text: {
    alignSelf: 'flex-start',
    textAlign: 'justify',
  },
  strong: {
    fontWeight: 'bold',
    color: 'white',
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
  list: {
    marginBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5,
  },
  listItemContent: {
    flexDirection: 'row',
    flexShrink: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  listItemBullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
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
};

export default defaultStyles;
