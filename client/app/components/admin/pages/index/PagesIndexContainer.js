import { connect } from 'react-redux';
import { pathOr } from 'ramda';
import { deletePage } from 'ducks/pages.js';
import PagesIndex from './PagesIndex.js';

function mapDispatchToProps(dispatch) {
  return {
    deletePage: (id) => dispatch(deletePage(id)),
  };
}

function mapStateToProps(state) {
  return {
    pages: pathOr(null, ['pages'], state),
    entities: pathOr(null, ['entities'], state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PagesIndex);