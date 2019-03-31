import { connect } from 'react-redux';
import { pathOr, find } from 'ramda';
import Pages from './Pages.js';
import { fetchPages } from 'ducks/pages.js';

function mapDispatchToProps(dispatch) {
  return {
    fetchPages: () => dispatch(fetchPages()),
  };
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Pages);