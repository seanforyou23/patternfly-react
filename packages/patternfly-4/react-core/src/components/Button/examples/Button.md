---
title: 'Button'
section: components
cssPrefix: 'pf-c-button'
typescript: true
propComponents: ['Button']
---
import { Button, Tooltip } from '@patternfly/react-core';
import { TimesIcon, PlusCircleIcon } from '@patternfly/react-icons';

## Examples
```js title=Block-level
import React from 'react';
import { Button } from '@patternfly/react-core';
import { TimesIcon, PlusCircleIcon } from '@patternfly/react-icons';

BlockButton = () => <Button isBlock>Block level button</Button>;
```

```js title=Variations
import React from 'react';
import { Button } from '@patternfly/react-core';
import { TimesIcon, PlusCircleIcon } from '@patternfly/react-icons';

ButtonVariants = () => (
  <React.Fragment>
    <Button variant="primary">Primary</Button> <Button variant="secondary">Secondary</Button>{' '}
    <Button variant="tertiary">Tertiary</Button> <Button variant="danger">Danger</Button>{' '}
    <Button variant="control">Control</Button>{' '}
    <Button variant="link" icon={<PlusCircleIcon />}>
      Link button
    </Button>{' '}
    <Button variant="plain" aria-label="Action">
      <TimesIcon />
    </Button>
    <Button variant="link" isInline>
      Inline link button
    </Button>
  </React.Fragment>
);
```

```js title=Links-as-button
import React from 'react';
import { Button } from '@patternfly/react-core';
import { TimesIcon, PlusCircleIcon } from '@patternfly/react-icons';

LinkButton = () => (
  <React.Fragment>
    <Button component="a" href="https://pf4.patternfly.org/" target="_blank" variant="primary">
      Link to core docs
    </Button>{' '}
    <Button component="a" href="https://pf4.patternfly.org/" target="_blank" variant="secondary">
      Secondary link to core docs
    </Button>{' '}
    <Button component="a" isDisabled href="https://pf4.patternfly.org/" target="_blank" variant="tertiary">
      Tertiary link to core docs
    </Button>
    <Button component="a" href="https://pf4.patternfly.org/contribution/#modifiers" variant="link">
     Jump to modifiers in contribution guidelines
    </Button>
  </React.Fragment>
);
```

```js title=Disabled-focusable-button-with-tooltip
import React from 'react';
import { Button } from '@patternfly/react-core';
import { TimesIcon, PlusCircleIcon, Tooltip } from '@patternfly/react-icons';

DisabledFocusableBtnWithTooltip = () => (
  <Tooltip content="Disabled and focusable button with tooltip">
    <Button isDisabledFocusable variant="secondary" onKeyPress={() => {alert('KeyPress')}} onClick={() => {alert('Click')}}>
      Secondary button to core docs
    </Button>
  </Tooltip>
);
```

```js title=Disabled-focusable-link-as-button-with-tooltip
import React from 'react';
import { Button } from '@patternfly/react-core';
import { TimesIcon, PlusCircleIcon, Tooltip } from '@patternfly/react-icons';

DisabledFocusableLinkBtnWithTooltip = () => (
  <Tooltip content="Disabled and focusable link button with tooltip">
    <Button variant="link" component="a" isDisabledFocusable href="https://pf4.patternfly.org/" target="_blank" variant="tertiary">
      Tertiary link as button to core docs
    </Button>
  </Tooltip>
);
```
