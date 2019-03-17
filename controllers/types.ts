type UIControlType = 'text_input' | 'date_input' | 'checkmark_input';


interface EntityField {
  name: string,
  type: UIControlType,
}

interface EditEntityField {
  action: 'rename' | 'drop' | 'add' | 'modify' | 'rename_table',
  name: string,
  type?: UIControlType,
  old_name?: string,
}

interface EntityRequestBody {
  name: string,
  fields?: EntityField[],
}

interface EntityEditRequestBody {
  fields: EditEntityField[],
}

// ======== Generic entity ===========

interface GenericFieldType {
  name: string,
  value: string,
};

interface GenericRequestBody {
  entity_name: string,
  fields: GenericFieldType[],
};
