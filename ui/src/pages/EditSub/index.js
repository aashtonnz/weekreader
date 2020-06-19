import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert, editSub, unsubscribe } from "../../state/actions";
import { checkEditSub } from "../../utils/validation";
import { Page, Input, Button, Div, A } from "../../views/styled";
import { FileInput, FileWrapper, UnsubButton, Img, Header } from "./styled";

const EditSub = ({ setAlert, editSub, unsubscribe, config, user }) => {
  const { id } = useParams();
  const history = useHistory();
  const [sub, setSub] = useState(null);
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [inputKey, setInputKey] = useState("");

  useEffect(() => {
    const sub = user && user.subscriptions.find((sub) => sub._id === id);
    if (sub) {
      setTitle(sub.title);
      setSub(sub);
    }
    if (user && !sub) {
      history.push("/");
    }
  }, [user, history, id]);

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeImg = (event) => {
    setImg(event.target.files[0]);
  };

  const onSubmit = () => {
    const invalidMsg = checkEditSub(title, img);
    if (invalidMsg) {
      setAlert(invalidMsg, "danger");
    } else {
      editSub(id, title, img, () => history.push("/"));
      setInputKey(Date.now());
    }
  };

  const onUnsubscribe = () => {
    unsubscribe(id, () => history.push("/"));
  };

  return (
    <Page>
      {user && (
        <>
          <Header>
            {sub && sub.imgKey && config && (
              <Img src={config.fileUrl + sub.imgKey} alt="" />
            )}
            {sub && sub.title}
          </Header>
          {sub && (
            <A href={sub.rssUrl} target="_blank">
              {sub.rssUrl}
            </A>
          )}
          <UnsubButton onClick={onUnsubscribe}>Unsubscribe</UnsubButton>
          <Div />
          <div>Details</div>
          <Input
            name="title"
            value={title}
            onChange={onChangeTitle}
            type="text"
            placeholder="Title"
          />
          <FileWrapper>
            <div>Replace image</div>
            <FileInput key={inputKey} type="file" onChange={onChangeImg} />
          </FileWrapper>
          <Button onClick={onSubmit}>Save Changes</Button>
        </>
      )}
    </Page>
  );
};

EditSub.propTypes = {
  setAlert: PropTypes.func.isRequired,
  editSub: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
  config: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  config: state.app.config,
  user: state.user.data,
});

export default connect(mapStateToProps, { setAlert, editSub, unsubscribe })(
  EditSub
);
