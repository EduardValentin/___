import { connect } from 'react-redux';
import { pathOr, find } from 'ramda';
import PagesIndex from './PagesIndex.js';
import { fetchPages } from 'ducks/pages.js';

function mapDispatchToProps(dispatch) {
	return {
	};
}

function mapStateToProps(state) {
	return {
		pages: pathOr(null, ['pages'], state),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PagesIndex);