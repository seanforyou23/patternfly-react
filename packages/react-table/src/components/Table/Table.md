---
title: 'Table'
cssPrefix: 'pf-c-table'
section: 'components'
typescript: true
propComponents: ['Table', 'TableHeader', 'TableBody', 'EditableTableCell', 'EditableSelectInputCell']
---

Note: Table lives in its own package at [@patternfly/react-table](https://www.npmjs.com/package/@patternfly/react-table)!

import {
  Table,
  TableHeader,
  TableBody,
  TableText,
  sortable,
  SortByDirection,
  headerCol,
  TableVariant,
  expandable,
  compoundExpand,
  cellWidth,
  textCenter,
  wrappable,
  truncate,
  nowrap,
  breakWord,
  fitContent,
  classNames,
  Visibility,
  getErrorTextByValidator,
  cancelCellEdits,
  validateCellEdits,
  applyCellEdits,
  EditableTextCell,
  EditableSelectInputCell
} from '@patternfly/react-table';

import {
    Checkbox,
    Button,
    EmptyState,
    EmptyStateBody,
    EmptyStatePrimary,
    Bullseye,
    SelectOption
} from '@patternfly/react-core';

import {
  SearchIcon,
  CodeBranchIcon,
  CodeIcon,
  CubeIcon
} from '@patternfly/react-icons';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Table/table';

import DemoSortableTable from './demo/DemoSortableTable';

## Examples

```js title=Editable-rows isBeta
import React from 'react';
import { TextInput, SelectOption } from '@patternfly/react-core';
import {
  Table,
  TableHeader,
  TableBody,
  TableVariant,
  getErrorTextByValidator,
  cancelCellEdits,
  validateCellEdits,
  applyCellEdits,
  EditableTextCell,
  EditableSelectInputCell
} from '@patternfly/react-table';

class EditableRowsTable extends React.Component {
  constructor(props) {
    super(props);

    this.options = [
      {value: "Placeholder...", isPlaceholder: true},
      {value: "Option 1"},
      {value: "Option 2"},
      {value: "Option 3"},
      {value: "Option 4"},
      {value: "Option 5"}
    ],

    this.state = {
      columns: [
        'Text input col 1',
        'Disabled text input col 2',
        'Text input col 3',
        'Text input col 4'
      ],
      actions: [{
        title: 'Some action',
        onClick: (event, rowId, rowData, extra) => console.log('clicked on Some action, on row: ', rowId)
      }],
      rows: [
        {
          rowEditBtnAriaLabel: idx => `Edit row ${idx}`,
          rowSaveBtnAriaLabel: idx => `Save edits for row ${idx}`,
          rowCancelBtnAriaLabel: idx => `Cancel edits for row ${idx}`,
          rowEditValidationRules: [
            {
              name: 'required',
              validator: value => value.trim() !== '',
              errorText: 'This field is required'
            }
          ],
          cells: [
            {
              title: (value, rowIndex, cellIndex, props) => {
                // console.log(`textinput for row ${rowIndex}: `, props);
                return (
                <EditableTextCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  handleTextInputChange={this.handleTextInputChange}
                  inputAriaLabel="Row 1 cell 1 content" />
              )
              },
              props: {
                value: 'Row 1 cell 1 content',
                name: 'uniqueIdRow1Cell1'
              }
            },
            {
              title: (value, rowIndex, cellIndex, props) => (
                <EditableTextCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  handleTextInputChange={this.handleTextInputChange}
                  isDisabled
                  inputAriaLabel="Row 1 cell 2 content" />
              ),
              props: {
                value: 'Row 1 cell 2, disabled content',
                name: 'uniqueIdRow1Cell2'
              }
            },
            {
              title: (value, rowIndex, cellIndex, props) => (
                <EditableTextCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  handleTextInputChange={this.handleTextInputChange}
                  inputAriaLabel="Row 1 cell 3 content" />
              ),
              props: {
                value: 'Row 1 cell 3 content',
                name: 'uniqueIdRow1Cell3'
              }
            },
            {
              title: (value, rowIndex, cellIndex, props) => {
                console.log(`props for row ${rowIndex}: `, props);
                return (
                <EditableSelectInputCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  onSelect={this.onSelect}
                  inputAriaLabel="Row 1 cell 4 content"
                  isOpen={props.isSelectOpen}
                  options={this.options.map((option, index) => (
                    <SelectOption
                      key={index}
                      value={option.value}
                      id={'uniqueIdRow1Cell4Option' + index}
                      isPlaceholder={option.isPlaceholder}
                    />
                  ))}
                  onToggle={(isOpen) => {this.onToggle(isOpen, rowIndex, cellIndex)}}
                  selections={props.selected}
                />
              )
              },
              props: {
                value: ['Option 1'],
                name: 'uniqueIdRow1Cell4',
                isSelectOpen: props.isSelectOpen || false,
                selected: props.selected || ['Option 1']
              }
            },
          ]
        },
        {
          cells: [
            {
              title: (value, rowIndex, cellIndex, props) => (
                <EditableTextCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  handleTextInputChange={this.handleTextInputChange}
                  inputAriaLabel="Row 2 cell 1 content" />
              ),
              props: {
                value: 'Row 2 cell 1 content',
                name: 'uniqueIdRow2Cell1'
              }
            },
            {
              title: (value, rowIndex, cellIndex, props) => (
                <EditableTextCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  handleTextInputChange={this.handleTextInputChange}
                  isDisabled
                  inputAriaLabel="Row 2 cell 2 content" />
              ),
              props: {
                value: 'Row 2 cell 2, disabled content',
                name: 'uniqueIdRow2Cell2'
              }
            },
            {
              title: (value, rowIndex, cellIndex, props) => (
                <EditableTextCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  handleTextInputChange={this.handleTextInputChange}
                  inputAriaLabel="Row 2 cell 3 content" />
              ),
              props: {
                value: 'Row 2 cell 3 content',
                name: 'uniqueIdRow2Cell3'
              }
            },
            {
              title: (value, rowIndex, cellIndex, props) => {
                console.log(`props for row ${rowIndex}: `, props);
                return (
                <EditableSelectInputCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  onSelect={this.onSelect}
                  inputAriaLabel="Row 2 cell 4 content"
                  isOpen={props.isSelectOpen}
                  options={this.options.map((option, index) => (
                    <SelectOption
                      key={index}
                      value={option.value}
                      id={'uniqueIdRow2Cell4Option' + index}
                      isPlaceholder={option.isPlaceholder}
                    />
                  ))}
                  onToggle={(isOpen) => {this.onToggle(isOpen, rowIndex, cellIndex)}}
                  selections={props.selected}
                  />
              )
              },
              props: {
                value: ['Option 2'],
                name: 'uniqueIdRow2Cell4',
                isSelectOpen: props.isSelectOpen || false,
                selected: props.selected || ['Option 2']
              }
            },
          ]
        },
        {
          rowEditValidationRules: [
            {
              name: 'required',
              validator: value => value.trim() !== '',
              errorText: 'This field is required'
            },
            {
              name: 'notFoo',
              validator: value => value.trim().toLowerCase() !== 'foo',
              errorText: 'Value cannot be "foo"'
            },
            {
              name: 'minLength',
              validator: value => value.trim().length >= 7,
              errorText: 'Value must be at least 7 characters'
            },
            {
              name: 'notXyz',
              validator: value => value.trim().toLowerCase() !== 'xyz',
              errorText: 'Value cannot be xyz'
            }
          ],
          cells: [
            {
              title: (value, rowIndex, cellIndex, props) => (
                <EditableTextCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  handleTextInputChange={this.handleTextInputChange}
                  inputAriaLabel="Row 3 cell 1 content" />
              ),
              props: {
                value: 'Row 3 cell 1 content',
                name: 'uniqueIdRow3Cell1'
              }
            },
            {
              title: (value, rowIndex, cellIndex, props) => (
                <EditableTextCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  handleTextInputChange={this.handleTextInputChange}
                  isDisabled
                  inputAriaLabel="Row 3 cell 2 content" />
              ),
              props: {
                value: 'Row 3 cell 2, disabled content',
                name: 'uniqueIdRow3Cell2'
              }
            },
            {
              title: (value, rowIndex, cellIndex, props) => (
                <EditableTextCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  handleTextInputChange={this.handleTextInputChange}
                  inputAriaLabel="Row 3 cell 3 content" />
              ),
              props: {
                value: 'Row 3 cell 3 content',
                name: 'uniqueIdRow3Cell3'
              }
            },
            {
              title: (value, rowIndex, cellIndex, props) => {
                console.log(`props for row ${rowIndex}: `, props);
                return (
                <EditableSelectInputCell
                  value={value}
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  props={props}
                  onSelect={this.onSelect}
                  inputAriaLabel="Row 3 cell 4 content"
                  isOpen={props.isSelectOpen}
                  options={this.options.map((option, index) => (
                    <SelectOption
                      key={index}
                      value={option.value}
                      id={'uniqueIdRow3Cell4Option' + index}
                      isPlaceholder={option.isPlaceholder}
                    />
                  ))}
                  onToggle={(isOpen) => {this.onToggle(isOpen, rowIndex, cellIndex)}}
                  selections={props.selected}
                  />
              )
              },
              props: {
                value: [''],
                name: 'uniqueIdRow3Cell4',
                isSelectOpen: props.isSelectOpen || false,
                selected: props.selected || []
              }
            }
          ]
        }
      ]
    };

    this.updateEditableRows = (evt, type, isEditable, rowIndex, validationErrors) => {

      let newRows = Array.from(this.state.rows);

      if (validationErrors && Object.keys(validationErrors).length) {
        newRows[rowIndex] = validateCellEdits(newRows[rowIndex], type, validationErrors);
        this.setState({ rows: newRows });
        return;
      }

      if (type === 'cancel') {
        newRows[rowIndex] = cancelCellEdits(newRows[rowIndex]);
        this.setState({ rows: newRows });
        return;
      }

      newRows[rowIndex] = applyCellEdits(newRows[rowIndex], type);

      this.setState({ rows: newRows });
    };

    this.handleTextInputChange = (newValue, evt, rowIndex, cellIndex) => {
      let newRows = Array.from(this.state.rows);
      newRows[rowIndex].cells[cellIndex].props.editableValue = newValue;
      this.setState({
        rows: newRows
      });
    };

    this.onSelect = (newValue, evt, rowIndex, cellIndex, isPlaceholder) => {
      let newRows = Array.from(this.state.rows);
      // console.log(`onSelect for row ${rowIndex} incoming props: `, newRows[rowIndex].cells[cellIndex].props);
      if (isPlaceholder) {
        newRows[rowIndex].cells[cellIndex].props.editableValue = [''];
        newRows[rowIndex].cells[cellIndex].props.selected = [''];
      } else {
        if (newRows[rowIndex].cells[cellIndex].props.editableValue === undefined) {
          newRows[rowIndex].cells[cellIndex].props.editableValue = [];
        }
        // newRows[rowIndex].cells[cellIndex].props.editableValue.push(newValue);

        console.log(newRows[rowIndex].cells[cellIndex].props.editableValue, newValue, newRows[rowIndex].cells[cellIndex].props.selected);

        newRows[rowIndex].cells[cellIndex].props.editableValue.push(newValue);
        // let newSelected = newRows[rowIndex].cells[cellIndex].props.selected;
        // newSelected.push(newValue);
        // newRows[rowIndex].cells[cellIndex].props.selected = newSelected

        let newSelected = newRows[rowIndex].cells[cellIndex].props.selected;
        newSelected.push(newValue);
        newRows[rowIndex].cells[cellIndex].props.editableValue = newSelected;
      }


      this.setState({
        rows: newRows
      });
    };

    this.onToggle = (isOpen, rowIndex, cellIndex) => {
      let newRows = Array.from(this.state.rows);
      newRows[rowIndex].cells[cellIndex].props.isSelectOpen = isOpen;;
      this.setState({
        rows: newRows
      });
    };
  }

  render() {
    const { columns, rows, actions } = this.state;

    return (
      <Table
        actions={actions}
        onRowEdit={this.updateEditableRows}
        aria-label="Editable Rows Table"
        variant={TableVariant.compact}
        cells={columns}
        rows={rows}>
          <TableHeader />
          <TableBody />
      </Table>
    );
  }
}
```
