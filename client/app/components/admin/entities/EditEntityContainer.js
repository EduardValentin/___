import { connect } from 'react-redux';
import {
  find,
  map,
  pathOr,
  values,
  compose,
} from 'ramda';
import { editEntity } from 'ducks/entities';
import EditEntity from './EditEntity';

function mapDispatchToProps(dispatch, props) {
  const { match: { params: { entityId } } } = props;
  return {
    submitEdit: ({ newFields, actions }) => {
      const newFieldsActions = compose(
        map(entity => ({
          action: 'add',
          name: entity.name,
          type: entity.type,
        })),
        values,
      )(newFields);

      dispatch(editEntity(entityId, [...actions, ...newFieldsActions]));
    },
  };
}

function mapStateToProps(state, props) {
  const entities = pathOr(null, ['entities'], state);
  const { match: { params: { entityId } } } = props;

  return {
    entity: find(entity => entity.id === parseInt(entityId, 10), entities.data),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditEntity);