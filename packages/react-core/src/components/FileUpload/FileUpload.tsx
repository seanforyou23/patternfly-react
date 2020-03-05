import * as React from 'react';
import Dropzone, { DropzoneProps } from 'react-dropzone';
import { Omit } from '../../helpers';
import { FileUploadField, FileUploadFieldProps } from './FileUploadField';
import { readTextFile } from '../../helpers/fileUtils';

export interface FileUploadProps
  extends Omit<
    FileUploadFieldProps,
    'children' | 'onBrowseButtonClick' | 'onClearButtonClick' | 'isDragActive' | 'containerRef'
  > {
  /** Unique id for the TextArea, also used to generate ids for accessible labels. */
  id: string;
  /** Value of the file's contents. */
  value?: string;
  /** Value to be shown in the read-only filename field. */
  filename?: string;
  /** A callback for when the file contents change. */
  onChange?: (
    value: string,
    filename: string,
    event:
      | React.DragEvent<HTMLElement> // User dragged/dropped a file
      | React.ChangeEvent<HTMLTextAreaElement> // User typed in the TextArea
      | React.MouseEvent<HTMLButtonElement, MouseEvent> // User clicked Clear button
  ) => void;
  /** Additional classes added to the FileUpload container element. */
  className?: string;
  /** Flag to show if the field is disabled. */
  isDisabled?: boolean;
  /** Flag to show if the field is read only. */
  isReadOnly?: boolean;
  /** Flag to show if a file is being loaded. */
  isLoading?: boolean;
  /** Aria-valuetext for the loading spinner */
  spinnerAriaValueText?: string;
  /** Flag to show if the field is required. */
  isRequired?: boolean;
  /* Value to indicate if the field is modified to show that validation state.
   * If set to success, field will be modified to indicate valid state.
   * If set to error,  field will be modified to indicate error state.
   */
  validated?: 'success' | 'error' | 'default';
  /** Aria-label for the TextArea. */
  'aria-label'?: string;
  /** Placeholder string to display in the empty filename field */
  filenamePlaceholder?: string;
  /** Aria-label for the read-only filename field */
  filenameAriaLabel?: string;
  /** Text for the Browse button */
  browseButtonText?: string;
  /** Text for the Clear button */
  clearButtonText?: string;
  /** Flag to hide the TextArea. */
  hideTextArea?: boolean;
  /** Optional extra props to customize react-dropzone. */
  dropzoneProps?: DropzoneProps;
}

// TODO handle the loading spinner case, and any other style cases I didn't get to yet
// TODO the loading spinner will either require state (convert back to a class) or callbacks to keep that state in the examples
// TODO handle an optional message for errors without using FieldGroup

export const FileUpload: React.FunctionComponent<FileUploadProps> = ({
  id,
  value = '',
  filename = '',
  onChange = (): any => undefined,
  dropzoneProps = {},
  ...props
}: FileUploadProps) => {
  const onDropAccepted = async (acceptedFiles: File[], event: React.DragEvent<HTMLElement>) => {
    if (acceptedFiles.length > 0) {
      const result = (await readTextFile(acceptedFiles[0])) as string;
      onChange(result, acceptedFiles[0].name, event);
    }
    dropzoneProps.onDropAccepted && dropzoneProps.onDropAccepted(acceptedFiles, event);
  };

  const onDropRejected = (rejectedFiles: File[], event: React.DragEvent<HTMLElement>) => {
    if (rejectedFiles.length > 0) {
      onChange('', rejectedFiles[0].name, event);
    }
    dropzoneProps.onDropRejected && dropzoneProps.onDropRejected(rejectedFiles, event);
  };

  const onClearButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onChange('', '', event);
  };

  return (
    <Dropzone multiple={false} {...dropzoneProps} onDropAccepted={onDropAccepted} onDropRejected={onDropRejected}>
      {({ getRootProps, getInputProps, isDragActive, open }) => (
        <FileUploadField
          {...getRootProps({
            ...props,
            refKey: 'containerRef',
            onClick: event => event.preventDefault() // Prevents clicking TextArea from opening file dialog
          })}
          id={id}
          filename={filename}
          value={value}
          onChange={onChange}
          isDragActive={isDragActive}
          onBrowseButtonClick={open}
          onClearButtonClick={onClearButtonClick}
        >
          <input {...getInputProps()} /* hidden, necessary for react-dropzone */ />
        </FileUploadField>
      )}
    </Dropzone>
  );
};