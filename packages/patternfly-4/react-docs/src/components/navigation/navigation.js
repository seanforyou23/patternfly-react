import React from 'react';
import { css } from '@patternfly/react-styles';
import styles from './navigation.styles';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.png';
import NavigationItemGroup from './navigationItemGroup';
import NavigationItem from './navigationItem';

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

  handleSearchChange = e => {
    const searchValue = e.target.value;
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
          <form className={[css(styles.search), 'pf-c-form'].join(' ')} onSubmit={event => { event.preventDefault(); return false; }}>
            <div className="pf-c-form__group">
              <label className="pf-c-form__label" htmlFor="primaryComponentSearch">
                <span className="pf-c-title pf-m-lg">
                  Search Components
                </span>
              </label>
              <input
                className={[css(styles.input), 'pf-c-form-control'].join(' ')}
                placeholder="For example, &quot;button&quot;"
                type="text"
                id="primaryComponentSearch"
                value={searchValue}
                onChange={this.handleSearchChange}
              />
            </div>
          </form>
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
