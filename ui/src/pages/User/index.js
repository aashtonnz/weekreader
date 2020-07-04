import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  logout,
  editSettings,
  editEmail,
  editPassword,
  deleteUser,
  setAlert,
} from "../../state/actions";
import { checkEmail, checkPassword } from "../../utils/validation";
import Select from "../../views/Select";
import Checkbox from "../../views/Checkbox";
import { Option } from "../../views/Select/styled";
import { Page, Button, Input, Div } from "../../views/styled";
import { hoursArray, daysArray } from "./utils";
import {
  SettingWrapper,
  DayWrapper,
  EmailWrapper,
  Day,
  EmailInput,
} from "./styled";

const User = ({
  logout,
  editSettings,
  editEmail,
  editPassword,
  setAlert,
  deleteUser,
  user,
}) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    password2: "",
    articlesUpdateHour: 0,
    articlesUpdateDays: [],
    mailSubscribed: false,
  });
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData({ ...user, password: "", password2: "" });
    }
  }, [user]);

  const updateUser = (event) =>
    setUserData({ ...userData, [event.target.name]: event.target.value });

  const onSubmitSettings = () => {
    editSettings(
      userData.articlesUpdateHour,
      userData.articlesUpdateDays,
      userData.mailSubscribed
    );
  };

  const onSubmitEmail = () => {
    const email = userData.email.trim();
    const invalidMsg = checkEmail(email);
    if (invalidMsg) {
      setAlert(invalidMsg, "danger");
      return;
    }
    editEmail(email);
  };

  const onSubmitPassword = () => {
    const invalidMsg = checkPassword(userData.password, userData.password2);
    if (invalidMsg) {
      setAlert(invalidMsg, "danger");
      return;
    }
    editPassword(userData.password);
  };

  const onLogout = () => logout();

  const onDelete = () => deleteUser();

  const onToggleDay = (value) => {
    const toggledDay = Number(value);
    if (!userData.articlesUpdateDays.includes(toggledDay)) {
      const newArticleUpdateDays = [...userData.articlesUpdateDays, toggledDay];
      setUserData({ ...userData, articlesUpdateDays: newArticleUpdateDays });
    } else {
      const newArticleUpdateDays = userData.articlesUpdateDays.filter(
        (day) => day !== toggledDay
      );
      setUserData({ ...userData, articlesUpdateDays: newArticleUpdateDays });
    }
  };

  const onToggleMailSub = () => {
    setUserData({ ...userData, mailSubscribed: !userData.mailSubscribed });
  };

  const onChangeUpdateHour = (articlesUpdateHour) => {
    setUserData({ ...userData, articlesUpdateHour });
  };

  return (
    <Page>
      {user && (
        <>
          <SettingWrapper>
            <div>Update inbox at UTC</div>
            <Select
              value={String(userData.articlesUpdateHour)}
              showSelected
              onChange={onChangeUpdateHour}
            >
              {hoursArray.map((hour, index) => (
                <Option key={index} value={String(index)}>
                  {hour}
                </Option>
              ))}
            </Select>
            <div>on</div>
          </SettingWrapper>
          <DayWrapper>
            {daysArray.map((day, index) => (
              <Fragment key={index}>
                <Checkbox
                  value={String(index)}
                  onChange={onToggleDay}
                  checked={userData.articlesUpdateDays.includes(index)}
                />{" "}
                <Day>{day}</Day>
              </Fragment>
            ))}
          </DayWrapper>
          <EmailWrapper>
            <div>Send an email</div>
            <Checkbox
              onChange={onToggleMailSub}
              checked={userData.mailSubscribed}
            />
          </EmailWrapper>
          <Button onClick={onSubmitSettings}>Save Settings</Button>
          <Div />
          <EmailInput
            name="email"
            value={userData.email}
            onChange={updateUser}
            type="email"
            placeholder="Email"
            autoComplete="off"
          />
          <Button onClick={onSubmitEmail}>Update</Button>
          <Div />
          <Input
            name="password"
            value={userData.password}
            onChange={updateUser}
            type="password"
            placeholder="New password"
            autoComplete="off"
          />
          <Input
            name="password2"
            value={userData.password2}
            onChange={updateUser}
            type="password"
            placeholder="Confirm new password"
            autoComplete="off"
          />
          <Button onClick={onSubmitPassword}>Update</Button>
          <Div />
          <Button onClick={onLogout}>Logout</Button>
          <Div />
          {deleteConfirmed ? (
            <Button onClick={onDelete} className="danger">
              Confirm Delete
            </Button>
          ) : (
            <Button onClick={() => setDeleteConfirmed(true)}>
              Delete Account
            </Button>
          )}
        </>
      )}
    </Page>
  );
};

User.propTypes = {
  logout: PropTypes.func.isRequired,
  editSettings: PropTypes.func.isRequired,
  editEmail: PropTypes.func.isRequired,
  editPassword: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user.data,
});

export default connect(mapStateToProps, {
  logout,
  setAlert,
  editSettings,
  editEmail,
  editPassword,
  deleteUser,
})(User);
