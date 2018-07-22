/*
 * AdminPage
 *
 * This is the first thing users see of our AdminPage, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from "react"
import ReactGA from "react-ga"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Switch, Route } from "react-router-dom"
import { get, includes, isFunction, map, omit } from "lodash"
import { compose } from "redux"

// Actions required for disabling and enabling the OverlayBlocker
import {
  disableGlobalOverlayBlocker,
  enableGlobalOverlayBlocker
} from "actions/overlayBlocker"

import { pluginLoaded, updatePlugin } from "containers/App/actions"
import {
  makeSelectBlockApp,
  makeSelectShowGlobalAppBlocker,
  selectHasUserPlugin,
  selectPlugins
} from "containers/App/selectors"

import { hideNotification } from "containers/NotificationProvider/actions"

// Design
import ComingSoonPage from "containers/ComingSoonPage"
import Content from "containers/Content"
import LocaleToggle from "containers/LocaleToggle"
import CTAWrapper from "components/CtaWrapper"
import Header from "components/Header/index"
import HomePage from "containers/HomePage/Loadable"
import InstallPluginPage from "containers/InstallPluginPage/Loadable"
import LeftMenu from "containers/LeftMenu"
import ListPluginsPage from "containers/ListPluginsPage/Loadable"
import Logout from "components/Logout"
import NotFoundPage from "containers/NotFoundPage/Loadable"
import OverlayBlocker from "components/OverlayBlocker"
import PluginPage from "containers/PluginPage/Loadable"
import ExercisePage from "../ExercisesPage"

// Utils
import auth from "utils/auth"
import injectReducer from "utils/injectReducer"
import injectSaga from "utils/injectSaga"

import { getGaStatus, getLayout } from "./actions"
import reducer from "./reducer"
import saga from "./saga"
import selectAdminPage from "./selectors"

import styles from "./styles.scss"

const PLUGINS_TO_BLOCK_PRODUCTION = ["content-type-builder", "settings-manager"]

export class AdminPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  state = { hasAlreadyRegistereOtherPlugins: false }

  getChildContext = () => ({
    disableGlobalOverlayBlocker: this.props.disableGlobalOverlayBlocker,
    enableGlobalOverlayBlocker: this.props.enableGlobalOverlayBlocker,
    plugins: this.props.plugins,
    updatePlugin: this.props.updatePlugin
  })

  componentDidMount() {
    this.checkLogin(this.props)
    this.props.getGaStatus()
    this.props.getLayout()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.checkLogin(nextProps)

      if (nextProps.adminPage.allowGa) {
        ReactGA.pageview(nextProps.location.pathname)
      }
    }

    if (
      get(nextProps.plugins.toJS(), ["users-permissions", "hasAdminUser"]) !==
      get(this.props.plugins.toJS(), ["users-permissions", "hasAdminUser"])
    ) {
      this.checkLogin(nextProps, true)
    }

    if (
      !this.hasUserPluginLoaded(this.props) &&
      this.hasUserPluginLoaded(nextProps)
    ) {
      this.checkLogin(nextProps)
    }
  }

  checkLogin = (props, skipAction = false) => {
    if (props.hasUserPlugin && this.isUrlProtected(props) && !auth.getToken()) {
      if (!this.hasUserPluginLoaded(props)) {
        return
      }

      // const endPoint = this.hasAdminUser(props) ? 'login': 'register';
      const endPoint = "login"
      this.props.history.push(`/plugins/users-permissions/auth/${endPoint}`)
    }

    if (
      !this.isUrlProtected(props) &&
      includes(props.location.pathname, "auth/register") &&
      this.hasAdminUser(props) &&
      !skipAction
    ) {
      this.props.history.push("/plugins/users-permissions/auth/login")
    }

    if (
      props.hasUserPlugin &&
      !this.isUrlProtected(props) &&
      !includes(props.location.pathname, "auth/register") &&
      !this.hasAdminUser(props)
    ) {
      this.props.history.push("/plugins/users-permissions/auth/register")
    }

    if (
      !props.hasUserPlugin ||
      (auth.getToken() && !this.state.hasAlreadyRegistereOtherPlugins)
    ) {
      map(
        omit(this.props.plugins.toJS(), ["users-permissions", "email"]),
        plugin => {
          switch (true) {
            case isFunction(plugin.bootstrap) &&
              isFunction(plugin.pluginRequirements):
              plugin
                .pluginRequirements(plugin)
                .then(plugin => {
                  return plugin.bootstrap(plugin)
                })
                .then(plugin => this.props.pluginLoaded(plugin))
              break
            case isFunction(plugin.pluginRequirements):
              plugin
                .pluginRequirements(plugin)
                .then(plugin => this.props.pluginLoaded(plugin))
              break
            case isFunction(plugin.bootstrap):
              plugin
                .bootstrap(plugin)
                .then(plugin => this.props.pluginLoaded(plugin))
              break
            default:
          }
        }
      )

      this.setState({ hasAlreadyRegistereOtherPlugins: true })
    }
  }

  hasUserPluginLoaded = props =>
    typeof get(props.plugins.toJS(), ["users-permissions", "hasAdminUser"]) !==
    "undefined"

  hasAdminUser = props => true

  isUrlProtected = props =>
    !includes(
      props.location.pathname,
      get(props.plugins.toJS(), ["users-permissions", "nonProtectedUrl"])
    )

  shouldDisplayLogout = () =>
    auth.getToken() &&
    this.props.hasUserPlugin &&
    this.isUrlProtected(this.props)

  showLeftMenu = () =>
    !includes(this.props.location.pathname, "users-permissions/auth/")

  retrievePlugins = () => {
    const {
      adminPage: { currentEnvironment },
      plugins
    } = this.props

    if (currentEnvironment === "production") {
      let pluginsToDisplay = plugins
      PLUGINS_TO_BLOCK_PRODUCTION.map(
        plugin => (pluginsToDisplay = pluginsToDisplay.delete(plugin))
      )

      return pluginsToDisplay
    }

    return plugins
  }

  render() {
    const { adminPage } = this.props
    const header = this.showLeftMenu() ? <Header /> : ""
    const style = this.showLeftMenu() ? {} : { width: "100%" }

    return (
      <div className={styles.adminPage}>
        {this.showLeftMenu() && (
          <LeftMenu
            plugins={this.retrievePlugins()}
            layout={adminPage.layout}
            version={adminPage.strapiVersion}
            auth={auth}
          />
        )}
        <CTAWrapper>
          {this.shouldDisplayLogout() && <Logout />}
          <LocaleToggle isLogged={this.shouldDisplayLogout() === true} />
        </CTAWrapper>
        <div className={styles.adminPageRightWrapper} style={style}>
          {header}
          <Content {...this.props} showLeftMenu={this.showLeftMenu()}>
            <Switch>
              <Route path="/" component={HomePage} exact />
              <Route
                path="/plugins/content-manager/exercise/create"
                component={ExercisePage}
              />
              <Route path="/plugins/:pluginId" component={PluginPage} />
              <Route path="/plugins" component={ComingSoonPage} />
              <Route path="/list-plugins" component={ListPluginsPage} exact />
              <Route
                path="/install-plugin"
                component={InstallPluginPage}
                exact
              />
              <Route path="/configuration" component={ComingSoonPage} exact />
              <Route path="" component={NotFoundPage} />
              <Route path="404" component={NotFoundPage} />
            </Switch>
          </Content>
        </div>
        <OverlayBlocker
          isOpen={this.props.blockApp && this.props.showGlobalAppBlocker}
        />
      </div>
    )
  }
}

AdminPage.childContextTypes = {
  disableGlobalOverlayBlocker: PropTypes.func,
  enableGlobalOverlayBlocker: PropTypes.func,
  plugins: PropTypes.object,
  updatePlugin: PropTypes.func
}

AdminPage.contextTypes = {
  router: PropTypes.object.isRequired
}

AdminPage.defaultProps = {
  adminPage: {},
  hasUserPlugin: true
}

AdminPage.propTypes = {
  adminPage: PropTypes.object,
  blockApp: PropTypes.bool.isRequired,
  disableGlobalOverlayBlocker: PropTypes.func.isRequired,
  enableGlobalOverlayBlocker: PropTypes.func.isRequired,
  getGaStatus: PropTypes.func.isRequired,
  getLayout: PropTypes.func.isRequired,
  hasUserPlugin: PropTypes.bool,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  pluginLoaded: PropTypes.func.isRequired,
  plugins: PropTypes.object.isRequired,
  showGlobalAppBlocker: PropTypes.bool.isRequired,
  updatePlugin: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  adminPage: selectAdminPage(),
  blockApp: makeSelectBlockApp(),
  hasUserPlugin: selectHasUserPlugin(),
  plugins: selectPlugins(),
  showGlobalAppBlocker: makeSelectShowGlobalAppBlocker()
})

function mapDispatchToProps(dispatch) {
  return {
    disableGlobalOverlayBlocker: () => {
      dispatch(disableGlobalOverlayBlocker())
    },
    enableGlobalOverlayBlocker: () => {
      dispatch(enableGlobalOverlayBlocker())
    },
    getGaStatus: () => {
      dispatch(getGaStatus())
    },
    getLayout: () => {
      dispatch(getLayout())
    },
    onHideNotification: id => {
      dispatch(hideNotification(id))
    },
    pluginLoaded: plugin => {
      dispatch(pluginLoaded(plugin))
    },
    updatePlugin: (pluginId, updatedKey, updatedValue) => {
      dispatch(updatePlugin(pluginId, updatedKey, updatedValue))
    },
    dispatch
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)
const withReducer = injectReducer({ key: "adminPage", reducer })
const withSaga = injectSaga({ key: "adminPage", saga })

export default compose(
  withReducer,
  withSaga,
  withConnect
)(AdminPage)

// export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);