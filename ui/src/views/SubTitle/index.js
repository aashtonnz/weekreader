import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  faEllipsisH as settingsIcon,
  faChevronUp as upIcon,
  faChevronDown as downIcon,
} from "@fortawesome/free-solid-svg-icons";
import { INBOX } from "../Subscription/filters";
import { collapseArticles, expandArticles } from "../../state/actions";
import DragHandle from "./DragHandle";
import {
  Img,
  Header,
  Icon,
  Wrapper,
  IconWrapper,
  HeaderWrapper,
  NumArticles,
} from "./styled";

const SubTitle = ({
  _id,
  link,
  title,
  filter,
  numArticles,
  collapsed,
  collapseArticles,
  expandArticles,
  isAuthenticated,
  imgKey,
  config,
}) => {
  const history = useHistory();

  const onEdit = () => {
    if (isAuthenticated) {
      history.push(`/edit-sub/${_id}`);
    } else {
      history.push("/signup");
    }
  };

  const toggleArticles = () =>
    collapsed ? expandArticles(_id) : collapseArticles(_id);

  return (
    <Wrapper>
      <HeaderWrapper>
        <Header href={link} target="_blank">
          {imgKey && config && <Img src={config.fileUrl + imgKey} alt="" />}
          {title}
          <NumArticles>{numArticles}</NumArticles>
        </Header>
      </HeaderWrapper>
      <IconWrapper>
        <Icon icon={collapsed ? downIcon : upIcon} onClick={toggleArticles} />
        <Icon icon={settingsIcon} onClick={onEdit} />
        {filter === INBOX && <DragHandle />}
      </IconWrapper>
    </Wrapper>
  );
};

SubTitle.propTypes = {
  _id: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  numArticles: PropTypes.number.isRequired,
  collapsed: PropTypes.bool,
  collapseArticles: PropTypes.func.isRequired,
  expandArticles: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  imgKey: PropTypes.string,
  config: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  config: state.app.config,
});

export default connect(mapStateToProps, { collapseArticles, expandArticles })(
  SubTitle
);
