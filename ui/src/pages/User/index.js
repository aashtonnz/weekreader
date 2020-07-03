import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  logout,
  editInboxUpdate,
  editEmail,
  editPassword,
  deleteUser,
  setAlert,
} from "../../state/actions";
import { trimValues } from "../../utils";
import { checkUserEdit } from "../../utils/validation";
import Select from "../../views/Select";
import Checkbox from "../../views/Checkbox";
import { Option } from "../../views/Select/styled";
import { Page, Button, Input, Div, Header } from "../../views/styled";
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
  editInboxUpdate,
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
    mailSubscribed: false,
  });
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [articleUpdateHour, setArticleUpdateHour] = useState(0);
  const [articleUpdateDays, setArticleUpdateDays] = useState([]);

  useEffect(() => {
    if (user) {
      setUserData({ ...user, password: "", password2: "" });
      setArticleUpdateHour(user.articleUpdate.hour);
      setArticleUpdateDays(user.articleUpdate.days);
    }
  }, [user]);

  const updateUser = (event) =>
    setUserData({ ...userData, [event.target.name]: event.target.value });

  const onEditInboxUpdate = () => {
    const { email, password, password2 } = trimValues(userData);
    const invalidMsg = checkUserEdit(email, password, password2);
    if (invalidMsg) {
      setAlert(invalidMsg, "danger");
      return;
    }
    // editUser(
    //   email,
    //   password,
    //   articleUpdateHour,
    //   articleUpdateDays,
    //   userData.mailSubscribed && email
    // );
  };

  const onSubmit = () => {
    const { email, password, password2 } = trimValues(userData);
    const invalidMsg = checkUserEdit(email, password, password2);
    if (invalidMsg) {
      setAlert(invalidMsg, "danger");
      return;
    }
    // editUser(
    //   email,
    //   password,
    //   articleUpdateHour,
    //   articleUpdateDays,
    //   userData.mailSubscribed && email
    // );
  };

  const onLogout = () => logout();

  const onDelete = () => deleteUser();

  const onToggleDay = (value) => {
    const toggledDay = Number(value);
    if (!articleUpdateDays.includes(toggledDay)) {
      setArticleUpdateDays([...articleUpdateDays, toggledDay]);
    } else {
      setArticleUpdateDays(
        articleUpdateDays.filter((day) => day !== toggledDay)
      );
    }
  };

  const onToggleMailSub = () => {
    setUserData({ ...userData, mailSubscribed: !userData.mailSubscribed });
  };

  return (
    <Page>
      {user && (
        <>
          <Header>{user.email}</Header>
          <SettingWrapper>
            <div>Update inbox at UTC</div>
            <Select
              value={String(articleUpdateHour)}
              showSelected
              onChange={setArticleUpdateHour}
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
                  checked={articleUpdateDays.includes(index)}
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
          <Div />
          <EmailInput
            name="email"
            value={userData.email}
            onChange={updateUser}
            type="email"
            placeholder="Email"
            autoComplete="off"
          />
          <Button onClick={() => {}}>Update</Button>
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
          <Button onClick={onSubmit}>Update</Button>
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
  editInboxUpdate: PropTypes.func.isRequired,
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
  editInboxUpdate,
  editEmail,
  editPassword,
  deleteUser,
})(User);
