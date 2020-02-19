import React from 'react';
import { Button, ButtonProps, Tooltip } from '@patternfly/react-core';
import { PlusCircleIcon, ExternalLinkAltIcon } from '@patternfly/react-icons';
import '@patternfly/react-styles/css/utilities/Spacing/spacing.css';

export class ButtonDemo extends React.Component {
  normalButton: ButtonProps = {
    className: 'pf-u-m-sm',
    component: 'button',
    onClick: () => {
      window.location.href = 'https://github.com/patternfly/patternfly-react';
    }
  };
  linkButton: ButtonProps = {
    className: 'pf-u-m-sm',
    component: 'button',
    icon: <PlusCircleIcon />,
    onKeyPress: () => {
      window.location.href = 'https://github.com/patternfly/patternfly-react';
    },
    variant: 'link'
  };
  linkAsButton: ButtonProps = {
    className: 'pf-u-m-sm',
    component: 'a',
    href: 'https://github.com/patternfly/patternfly-react',
    icon: <ExternalLinkAltIcon />,
    target: '_blank'
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="btn-demo-area">
        <Button {...this.normalButton} variant="primary">
          Primary
        </Button>
        <Button {...this.normalButton} variant="secondary">
          Secondary
        </Button>
        <Button {...this.normalButton} variant="tertiary">
          Tertiary
        </Button>
        <Button {...this.normalButton} variant="danger">
          Danger
        </Button>
        <Button {...this.normalButton} variant="link">
          Link
        </Button>
        <Button {...this.normalButton} variant="plain">
          Plain
        </Button>
        <Button {...this.normalButton} variant="control">
          Control
        </Button>
        <Button {...this.normalButton} isDisabled>
          Disabled button
        </Button>
        <Button {...this.normalButton} isDisabledFocusable>
          Disabled and focusable button
        </Button>
        <Button {...this.normalButton} tabIndex={2}>
          Button with tabindex set to 2
        </Button>
        <Tooltip content="This tooltip content is available to the disabled button">
          <Button
            {...this.normalButton}
            isDisabledFocusable
            onKeyPress={() => {
              window.location.href = 'https://github.com/patternfly/patternfly-react';
            }}
          >
            Disabled focusable with tooltip
          </Button>
        </Tooltip>

        <hr className="pf-u-m-md" />
        <Button {...this.linkButton}>Link button</Button>
        <Button {...this.linkButton} isInline>
          Inline Link Button
        </Button>
        <Button {...this.linkButton} isDisabled>
          Disabled link button
        </Button>
        <Button {...this.linkButton} isDisabledFocusable>
          Disabled focusable link button
        </Button>
        <Button {...this.linkButton} tabIndex={0}>
          Button with tabindex set to zero
        </Button>

        <hr className="pf-u-m-md" />
        <Button {...this.linkAsButton}>Link as button</Button>
        <Button {...this.linkAsButton} isDisabled>
          Disabled link as button
        </Button>
        <Button {...this.linkAsButton} isDisabledFocusable>
          Disabled focusable link as button
        </Button>
        <Button {...this.linkAsButton} tabIndex={4}>
          Link as button with tabindex set to 4
        </Button>
        <Tooltip content="This tooltip content is available to the disabled link as button">
          <Button {...this.linkAsButton} isDisabledFocusable>
            Disabled focusable link as button with tooltip
          </Button>
        </Tooltip>
      </div>
    );
  }
}
