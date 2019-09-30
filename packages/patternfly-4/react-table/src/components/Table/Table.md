---
title: 'Table'
cssPrefix: 'pf-c-table'
section: 'components'
typescript: true
propComponents: ['Table', 'TableHeader', 'TableBody']
---

Note: Table lives in its own package at [@patternfly/react-table](https://www.npmjs.com/package/@patternfly/react-table)!

import {
  Table,
  TableHeader,
  TableBody,
  sortable,
  SortByDirection,
  headerCol,
  TableVariant,
  expandable,
  compoundExpand,
  cellWidth,
  textCenter,
  wrappable,
  classNames,
  Visibility,
  editable
} from '@patternfly/react-table';

import {
  CodeBranchIcon,
  CodeIcon,
  CubeIcon
} from '@patternfly/react-icons';

import DemoSortableTable from './demo/DemoSortableTable';

## Editable table

```js
import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  sortable,
  SortByDirection,
  headerCol,
  TableVariant,
  expandable,
  cellWidth,
  textCenter,
  editable
} from '@patternfly/react-table';

class Editable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Repositories',
          cellTransforms: [editable]
        },
        {
          title: 'Branches',
          // cellTransforms: [editable]
        },
        {
          title: 'Pull requests',
          cellTransforms: [editable]
        },
        {
          title: 'Workspaces',
          cellTransforms: [editable]
        },
        {
          title: 'Last Commit',
          transforms: [textCenter],
          cellTransforms: [editable]
        }
      ],
      rows: [
        {
          cells: ['one', 'two', 'three', 'four', 'five'],
          isInEditMode: false
        },
        {
          cells: [
            {
              title: <div>one - 2</div>,
              props: { title: 'hover title', colSpan: 3 }
            },
            'four - 2',
            'five - 2'
          ],
          isInEditMode: false
        },
        {
          cells: [
            'one - 3',
            'two - 3',
            'three - 3',
            'four - 3',
            {
              title: 'five - 3 (not centered)',
              props: { textCenter: false }
            }
          ],
          isInEditMode: false
        }
      ],
      actions: [
{
          title: 'Foozbaz',
          onClick: (foo) => {
            console.log('foo!', foo)
          }
        }
      ]
    };
    this.handleEditMode = this.handleEditMode.bind(this);
  }

  handleEditMode(rowId) {
    console.log(`enter edit mode for ${rowId}`);

    this.setState((prevState) => {

      let newRowDefinition = prevState.rows.map((row, idx) => {
        let newRow = row;
        if (rowId === idx) { // if it's the row we clicked edit on...
          if (newRow.hasOwnProperty('isInEditMode')) {
            newRow.isInEditMode = !newRow.isInEditMode;
          } else {
            newRow.isInEditMode = true;
          }
          return newRow;
        } else {
          return row;
        }
      });

      return {
        rows: newRowDefinition
      }
    });
  }

  render() {
    const { columns, rows, actions } = this.state;

    return (
      <Table onEditMode={this.handleEditMode} editableRows={true} actions={actions} caption="Simple Table" cells={columns} rows={rows}>
        <TableHeader />
        <TableBody />
      </Table>
    );
  }
}
```
