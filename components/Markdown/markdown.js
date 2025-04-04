import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  View,
  Image,
  Linking,
  StyleSheet,
  Appearance,
} from 'react-native';

import { Text } from '@/components/Themed/Text';

import styles from './styles';
import Utils from './Utils';
import Colors from '@/constants/Colors';

class Markdown extends Component {
  constructor(props) {
    super(props);

    const outputResult = Utils.getSyntaxTree(this.props);
    const defaultStyles = this.props.useDefaultStyles && styles ? styles : {};
    const _styles = StyleSheet.create(
      Object.assign({}, defaultStyles, this.props.markdownStyles),
    );

    this.state = {
      syntaxTree: outputResult,
      styles: _styles,
      prevPropsChildren: undefined,
      prevPropsMarkdownStyles: undefined,
    };
  }

  static getDerivedStateFromProps(props, state) {
    let newState = Object.assign({}, state);
    let changed = false;

    if (props.children !== state.prevPropsChildren) {
      const outputResult = Utils.getSyntaxTree(props);
      newState.syntaxTree = outputResult;
      newState.prevPropsChildren = props.children;
      changed = true;
    }

    if (props.markdownStyles !== state.prevPropsMarkdownStyles) {
      const defaultStyles = props.useDefaultStyles && styles ? styles : {};
      newState.styles = StyleSheet.create(
        Object.assign(defaultStyles, props.markdownStyles),
      );
      newState.prevPropsMarkdownStyles = props.markdownStyles;
      changed = true;
    }

    if (changed) {
      return newState;
    }

    return null;
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.children !== nextProps.children ||
      this.props.markdownStyles !== nextProps.markdownStyles
    );
  }

  renderImage(node, key) {
    const { styles } = this.state;

    if (this.props.renderImage) {
      return this.props.renderImage(
        node.props.src,
        node.props.alt,
        node.props.title,
        key,
      );
    }

    return (
      <View style={styles.imageWrapper} key={'imageWrapper_' + key}>
        <Image source={{ uri: node.props.src }} style={styles.image} />
      </View>
    );
  }

  renderLine(node, key) {
    const { styles } = this.state;

    if (this.props.renderLine) {
      return this.props.renderLine(key);
    }

    return <View style={styles.hr} key={'hr_' + key} />;
  }

  renderList(node, key, ordered) {
    const { styles } = this.state;

    if (this.props.renderList) {
      const children = this.renderNodes(node.props.children, key, { ordered });
      return this.props.renderList(ordered, children, key);
    }

    return (
      <View key={'list_' + key} style={styles.list}>
        {this.renderNodes(node.props.children, key, { ordered })}
      </View>
    );
  }

  renderListBullet(ordered, index) {
    const { styles } = this.state;
    const scheme = Appearance.getColorScheme();

    if (ordered) {
      return (
        <Text key={'listBullet_' + index} style={styles.listItemNumber}>
          {index + 1 + '.'}
        </Text>
      );
    }

    return (
      <View
        key={'listBullet_' + index}
        style={[
          styles.listItemBullet,
          { backgroundColor: Colors[scheme].text },
        ]}
      />
    );
  }

  renderListItem(node, key, index, extras) {
    const { styles } = this.state;

    let children = this.renderNodes(node.props.children, key, extras);

    if (this.props.renderListItem) {
      const { ordered } = extras;
      return this.props.renderListItem(index, ordered, children, key);
    }

    const SafeWrapper = Utils.isTextOnly(children) ? Text : View;

    return (
      <View style={styles.listItem} key={'listItem_' + key}>
        {this.props.renderListBullet
          ? this.props.renderListBullet(extras.ordered, index)
          : this.renderListBullet(extras.ordered, index)}
        <SafeWrapper
          key={'listItemContent_' + key}
          style={styles.listItemContent}
        >
          {children}
        </SafeWrapper>
      </View>
    );
  }

  renderText(node, key, extras, textType) {
    const { styles } = this.state;

    let style =
      extras && extras.style ? [styles.text].concat(extras.style) : styles.text;

    let text = null;

    if (this.props.debug) {
      console.log(textType);
      console.log(node);
      console.log(extras);
      console.log(style);
    }

    if (node && node.props && node.props.children) {
      if (Array.isArray(node.props.children)) {
        if (node.props.children.length == 1) {
          text = node.props.children;
        } else {
          // If we have a custom renderer, we convert the child nodes to elements and pass to the consumer
          let children = this.renderNodes(node.props.children, key, extras);
          if (this.props.renderText) {
            // Text is an array of JSX.Elements
            return this.props.renderText(textType, children, key);
          } else {
            return (
              <Text key={key} style={style}>
                {children}
              </Text>
            );
          }
        }
      } else {
        // Text is a string value
        text = node.props.children;
      }
    } else {
      // Node should just be a text string
      text = node;
    }

    if (this.props.debug) console.log('Rendering...');
    if (this.props.renderText) {
      if (this.props.debug) console.log('Custom render');
      return this.props.renderText(textType, text, key);
    }
    return (
      <Text key={key} style={style}>
        {text}
      </Text>
    );
  }

  renderLink(node, key) {
    const { styles } = this.state;
    let extras = Utils.concatStyles(null, styles.link);
    let children = this.renderNodes(node.props.children, key, extras);

    if (this.props.renderLink) {
      return this.props.renderLink(
        node.props.href,
        node.props.title,
        children,
        key,
      );
    }

    const SafeWrapper = Utils.isTextOnly(children) ? Text : TouchableOpacity;

    return (
      <SafeWrapper
        style={styles.linkWrapper}
        key={'linkWrapper_' + key}
        onPress={() => Linking.openURL(node.props.href).catch(() => {})}
      >
        {children}
      </SafeWrapper>
    );
  }

  renderBlockQuote(node, key, extras) {
    extras = extras
      ? Object.assign(extras, { blockQuote: true })
      : { blockQuote: true };
    return this.renderBlock(node, key, extras);
  }

  renderBlock(node, key, extras) {
    const { styles } = this.state;

    let isBlockQuote;
    if (extras && extras.blockQuote) {
      isBlockQuote = true;

      /* Ensure that blockQuote style is applied only once, and not for
       * all nested components as well (unless there is a nested blockQuote)
       */
      delete extras.blockQuote;
    }
    const children = this.renderNodes(node.props.children, key, extras);

    if (isBlockQuote) {
      if (this.props.renderBlockQuote) {
        return this.props.renderBlockQuote(children, key);
      }
      return (
        <View
          key={'blockQuote_' + key}
          style={[styles.block, styles.blockQuote]}
        >
          <Text lightColor='#fff' darkColor='#fff' style={styles.blockQuoteText}>{children}</Text>
        </View>
      );
    } else if (Utils.isTextOnly(children)) {
      if (this.props.renderBlockText) {
        return this.props.renderBlockText(children, key);
      }
      return (
        <Text key={`block_text_` + key} style={styles.block}>
          {children}
        </Text>
      );
    } else {
      if (this.props.renderBlock) {
        return this.props.renderBlock(children, key);
      }
      return (
        <View key={'block_' + key} style={styles.block}>
          {children}
        </View>
      );
    }
  }

  renderTable(node, key, extras, element) {
    const { styles } = this.state;
    let children;

    switch (element) {
      case 'table':
      case 'tbody':
      case 'tr':
      case 'th':
      case 'td':
        children = this.renderNodes(node.props.children, key, extras);
        let style = [styles[element]];
        if (node.props?.style) style.push(node.props.style);
        return (
          <View key={key} style={style}>
            {children}
          </View>
        );
      case 'thead':
        children = this.renderNodes([node.props.children], key, extras);
        return (
          <View style={styles.thead} key={key}>
            {children}
          </View>
        );
    }
  }

  renderPre(node, key, extras) {
    const { styles } = this.state;
    let style = [styles.pre];
    if (extras?.style) style.push(...extras.style);

    const children = this.renderNodes([node.props.children], key, extras);

    return (
      <View style={style} key={key}>
        {children}
      </View>
    );
  }

  renderNode(node, key, index, extras) {
    if (node == null || node == 'null' || node == 'undefined' || node == '') {
      return null;
    }

    const { styles } = this.state;

    if (this.props.debug) console.log('rendering node: ', node);

    switch (node.type) {
      case 'h1':
        return this.renderText(
          node,
          key,
          Utils.concatStyles(extras, styles.h1),
          'h1',
        );
      case 'h2':
        return this.renderText(
          node,
          key,
          Utils.concatStyles(extras, styles.h2),
          'h2',
        );
      case 'h3':
        return this.renderText(
          node,
          key,
          Utils.concatStyles(extras, styles.h3),
          'h3',
        );
      case 'h4':
        return this.renderText(
          node,
          key,
          Utils.concatStyles(extras, styles.h4),
          'h4',
        );
      case 'h5':
        return this.renderText(
          node,
          key,
          Utils.concatStyles(extras, styles.h5),
          'h5',
        );
      case 'h6':
        return this.renderText(
          node,
          key,
          Utils.concatStyles(extras, styles.h6),
          'h6',
        );
      case 'hr':
        return this.renderLine(node, key);
      case 'div':
        return this.renderBlock(node, key, extras);
      case 'ul':
        return this.renderList(node, key, false);
      case 'ol':
        return this.renderList(node, key, true);
      case 'li':
        return this.renderListItem(node, key, index, extras);
      case 'a':
        return this.renderLink(node, key);
      case 'img':
        return this.renderImage(node, key);
      case 'strong':
        if (this.props.debug) console.log('Node type: strong');
        return this.renderText(
          node,
          key,
          Utils.concatStyles(extras, styles.strong),
          'strong',
        );
      case 'del':
        return this.renderText(
          node,
          key,
          Utils.concatStyles(extras, styles.del),
          'del',
        );
      case 'em':
        return this.renderText(
          node,
          key,
          Utils.concatStyles(extras, styles.em),
          'em',
        );
      case 'u':
        return this.renderText(
          node,
          key,
          Utils.concatStyles(extras, styles.u),
          'u',
        );
      case 'pre':
        return this.renderPre(
          node,
          key,
          Utils.concatStyles(extras, styles.code),
        );
      case 'code':
        return this.renderText(
          node,
          key,
          Utils.concatStyles(extras, styles.code),
          'code',
        );
      case 'blockquote':
        return this.renderBlockQuote(node, key);
      case 'table':
        return this.renderTable(node, key, extras, 'table');
      case 'thead':
        return this.renderTable(node, key, extras, 'thead');
      case 'tbody':
        return this.renderTable(node, key, extras, 'tbody');
      case 'tr':
        return this.renderTable(node, key, extras, 'tr');
      case 'th':
        return this.renderText(
          node,
          key,
          Utils.concatStyles(extras, styles.th),
          'th',
        );
      case 'td':
        return this.renderText(node, key, extras, 'td');
      case undefined:
        if (this.props.debug) console.log(node);
        if (this.props.debug) console.log(extras);
        return this.renderText(node, key, extras);
      default:
        if (this.props.debug)
          console.log('Node type ' + node.type + ' is not supported');
        return null;
    }
  }

  renderNodes(nodes, key, extras) {
    return nodes.map((node, index) => {
      const newKey = key ? key + '_' + index : index + '';
      if (this.props.debug) console.log('== RENDERING NEW NODE ==');
      return this.renderNode(node, newKey, index, extras);
    });
  }

  render() {
    let content = this.renderNodes(this.state.syntaxTree, null, null);

    if (this.props.debug) {
      console.log('\n\n==== LOGGING NODE TREE ===');
      Utils.logDebug(content);
    }

    return <View {...this.props}>{content}</View>;
  }
}

Markdown.propTypes = {
  debug: PropTypes.bool,
  parseInline: PropTypes.bool,
  markdownStyles: PropTypes.object,
  useDefaultStyles: PropTypes.bool,
  renderImage: PropTypes.func,
  renderLink: PropTypes.func,
  renderListBullet: PropTypes.func,
  renderLine: PropTypes.func,
  renderList: PropTypes.func,
  renderListItem: PropTypes.func,
  renderText: PropTypes.func,
  renderBlockQuote: PropTypes.func,
  renderBlockText: PropTypes.func,
  renderBlock: PropTypes.func,
};

Markdown.defaultProps = {
  debug: false,
  useDefaultStyles: true,
  parseInline: false,
  markdownStyles: {},
};

export default Markdown;
