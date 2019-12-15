import React, { Component } from 'react';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  ButtonGroup,
  Box,
} from '@chakra-ui/core';

class MessageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.message.text,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (
      <li>
        <Box maxW="sm" borderWidth="1px" rounded="lg" p={3}>
          {editMode ? (
            <Input
              type="text"
              value={editText}
              onChange={this.onChangeEditText}
            />
          ) : (
            <p>
              <strong>{message.text}</strong> <br />
              {message.userId}
            </p>
          )}

          <ButtonGroup spacing={3}>
            {authUser.uid === message.userId && (
              <>
                {editMode ? (
                  <>
                    <Button
                      variant="ghost"
                      onClick={this.onSaveEditText}
                    >
                      Save
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={this.onToggleEditMode}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={this.onToggleEditMode}
                  >
                    Edit
                  </Button>
                )}

                {!editMode && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => onRemoveMessage(message.uid)}
                  >
                    Delete
                  </Button>
                )}
              </>
            )}
          </ButtonGroup>
        </Box>
      </li>
    );
  }
}

export default MessageItem;
