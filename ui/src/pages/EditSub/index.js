import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert, editSub, unsubscribe } from "../../state/actions";
import { checkEditSub } from "../../utils/validation";
import Checkbox from "../../views/Checkbox";
import Select from "../../views/Select";
import { Option } from "../../views/Select/styled";
import { Page, Button, Div, A, SubHeader } from "../../views/styled";
import {
  FileInput,
  FileWrapper,
  Img,
  Header,
  CheckboxWrapper,
  TitleInput,
  MaxArticlesWrapper,
} from "./styled";

const MAX_DAILY_ARTICLES_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const EditSub = ({ setAlert, editSub, unsubscribe, config, user }) => {
  const { id } = useParams();
  const history = useHistory();
  const [sub, setSub] = useState(null);
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [maxDailyArticles, setMaxDailyArticles] = useState(3);
  const [inputKey, setInputKey] = useState("");
  const [descriptionsHidden, setDescHidden] = useState(false);

  useEffect(() => {
    const sub = user && user.subscriptions.find((sub) => sub._id === id);
    if (sub) {
      setTitle(sub.title);
      setDescHidden(sub.descriptionsHidden);
      setMaxDailyArticles(sub.maxDailyArticles);
      setSub(sub);
    }
    if (user && !sub) {
      history.push("/");
    }
  }, [user, history, id]);

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeMaxDailyArticles = (value) => {
    setMaxDailyArticles(Number(value));
  };

  const onChangeImg = (event) => {
    setImg(event.target.files[0]);
  };

  const onDescriptionsHidden = () => {
    setDescHidden(!descriptionsHidden);
  };

  const onSubmit = () => {
    const invalidMsg = checkEditSub(title, img);
    if (invalidMsg) {
      setAlert(invalidMsg, "danger");
    } else {
      editSub(id, title, img, descriptionsHidden, maxDailyArticles, () =>
        history.push("/")
      );
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
          <TitleInput
            name="title"
            value={title}
            onChange={onChangeTitle}
            type="text"
            placeholder="Title"
          />
          <CheckboxWrapper>
            <div>Hide descriptions</div>
            <Checkbox
              checked={descriptionsHidden}
              onChange={onDescriptionsHidden}
            />
          </CheckboxWrapper>
          <MaxArticlesWrapper>
            <div>Max articles per day</div>
            <Select
              value={String(maxDailyArticles)}
              showSelected
              onChange={onChangeMaxDailyArticles}
            >
              {MAX_DAILY_ARTICLES_OPTIONS.map((num) => (
                <Option key={num} value={String(num)}>
                  {num}
                </Option>
              ))}
            </Select>
          </MaxArticlesWrapper>
          <FileWrapper>
            <SubHeader>Replace image</SubHeader>
            <FileInput key={inputKey} type="file" onChange={onChangeImg} />
          </FileWrapper>
          <Button onClick={onSubmit}>Save Settings</Button>
          <Div />
          <Button onClick={onUnsubscribe}>Unsubscribe</Button>
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
