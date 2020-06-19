import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlus as addIcon } from "@fortawesome/free-solid-svg-icons";
import { setAlert, subscribe } from "../../state/actions";
import { checkAdd } from "../../utils/validation";
import { Form } from "../../views/styled";
import { AddWrapper, AddInput, AddButton } from "./styled";

const Add = ({ setAlert, subscribe, user }) => {
  const history = useHistory();
  const [rssUrl, setRssUrl] = useState("");

  const updateRssUrl = (event) => setRssUrl(event.target.value);

  const onSubscribe = (event) => {
    event.preventDefault();
    if (!user) {
      return history.push("/signup");
    }
    setRssUrl(rssUrl.trim());
    const invalidMsg = checkAdd(user, rssUrl);

    if (invalidMsg) {
      return setAlert(invalidMsg, "danger");
    }
    subscribe(rssUrl);
    setRssUrl("");
  };

  return (
    <Form>
      <AddWrapper>
        <AddInput
          value={rssUrl}
          type="text"
          placeholder="Add RSS feed"
          onChange={updateRssUrl}
        />
        <AddButton onClick={onSubscribe}>
          <Icon icon={addIcon} />
        </AddButton>
      </AddWrapper>
    </Form>
  );
};

Add.propTypes = {
  setAlert: PropTypes.func.isRequired,
  subscribe: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user.data,
});

export default connect(mapStateToProps, { setAlert, subscribe })(Add);
