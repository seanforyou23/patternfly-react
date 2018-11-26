import React from 'react';
import { css } from '@patternfly/react-styles';
import styles from './navigation.styles';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.png';
import NavigationItemGroup from './navigationItemGroup';
import NavigationItem from './navigationItem';
import {
  Form,
  FormGroup,
  TextInput
} from '@patternfly/react-core';

const routeShape = PropTypes.shape({
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
});

const propTypes = {
  componentRoutes: PropTypes.arrayOf(routeShape),
  layoutRoutes: PropTypes.arrayOf(routeShape),
  demoRoutes: PropTypes.arrayOf(routeShape)
};

const defaultProps = {
  componentRoutes: [],
  layoutRoutes: [],
  demoRoutes: []
};

class Navigation extends React.Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  state = {
    searchValue: ''
  };

  handleSearchChange = (checked, event) => {
    const searchValue = event.target.value;
    this.setState(() => ({
      searchValue
    }));
  };

  render() {
    const { componentRoutes, layoutRoutes, demoRoutes } = this.props;
    const { searchValue } = this.state;
    const searchRE = new RegExp(searchValue, 'i');

    const filteredComponentRoutes = componentRoutes.filter(c => searchRE.test(c.label));

    const filteredLayoutRoutes = layoutRoutes.filter(c => searchRE.test(c.label));

    const filteredDemoRoutes = demoRoutes.filter(c => searchRE.test(c.label));

    return (
      <div className={css(styles.navigation)}>
        <div className={css(styles.navigationContent)}>
          <div className={css(styles.logo)}>
            <Link to="/">
              <img src={logo} alt="PatternFly Logo" />
            </Link>
          </div>
          <Form className={css(styles.search)} onSubmit={event => { event.preventDefault(); return false; }}>
            <FormGroup
              label="Search Components"
              fieldId="primaryComponentSearch">
              <TextInput
                type="text"
                id="primaryComponentSearch"
                name="primaryComponentSearch"
                placeholder="For example, &quot;button&quot;"
                value={searchValue}
                onChange={this.handleSearchChange}
              />
            </FormGroup>
          </Form>
          <NavigationItemGroup title="Style">
            <NavigationItem to="/styles/tokens">Tokens</NavigationItem>
            <NavigationItem to="/styles/icons">Icons</NavigationItem>
          </NavigationItemGroup>
          {Boolean(filteredComponentRoutes.length) && (
            <NavigationItemGroup title="Components">
              {filteredComponentRoutes.map(route => (
                <NavigationItem key={route.label} to={route.to}>
                  {route.label}
                </NavigationItem>
              ))}
            </NavigationItemGroup>
          )}
          {Boolean(filteredLayoutRoutes.length) && (
            <NavigationItemGroup title="Layouts">
              {filteredLayoutRoutes.map(route => (
                <NavigationItem key={route.label} to={route.to}>
                  {route.label}
                </NavigationItem>
              ))}
            </NavigationItemGroup>
          )}
          {Boolean(filteredDemoRoutes.length) && (
            <NavigationItemGroup title="Demos">
              {filteredDemoRoutes.map(route => (
                <NavigationItem key={route.label} to={route.to}>
                  {route.label}
                </NavigationItem>
              ))}
            </NavigationItemGroup>
          )}
        </div>
      </div>
    );
  }
}

export default Navigation;
