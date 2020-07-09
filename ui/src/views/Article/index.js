import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  faTimes as hideIcon,
  faArrowLeft as unhideIcon,
  faBookmark as bookmarkedIcon,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as unbookmarkedIcon } from "@fortawesome/free-regular-svg-icons";
import {
  articleVisited,
  articleHidden,
  articleUnhidden,
  articleBookmarked,
  articleUnbookmarked,
} from "../../state/actions";
import { truncateDesc } from "../../utils";
import Icon from "./Icon";
import {
  Wrapper,
  TitleWrapper,
  Title,
  Description,
  IconWrapper,
  PublishedAt,
} from "./styled";

const Article = ({
  _id,
  link,
  title,
  publishedAt,
  articleVisited,
  articleHidden,
  articleUnhidden,
  articleBookmarked,
  articleUnbookmarked,
  description,
  visited,
  bookmarked,
  hidden,
  isAuthenticated,
  descriptionHidden,
}) => {
  const history = useHistory();

  const onClick = () => {
    window.open(link, "_blank");
    if (isAuthenticated) {
      articleVisited(_id);
    }
  };

  const onHide = () => {
    articleHidden(_id);
  };

  const onUnhide = () => {
    if (!isAuthenticated) {
      history.push("/signup");
      return;
    }
    articleUnhidden(_id);
  };

  const onBookmark = () => {
    bookmarked ? articleUnbookmarked(_id) : articleBookmarked(_id);
  };
  return (
    <Wrapper visited={visited}>
      <TitleWrapper>
        <Title onClick={onClick}>
          {title}
          <PublishedAt>{moment(publishedAt).format("MMM D")}</PublishedAt>
        </Title>
        <IconWrapper>
          <Icon
            icon={bookmarked ? bookmarkedIcon : unbookmarkedIcon}
            active={Boolean(bookmarked)}
            onClick={onBookmark}
            visible={!hidden}
          />
          <Icon
            icon={hidden ? unhideIcon : hideIcon}
            onClick={() => (hidden ? onUnhide() : onHide())}
          />
        </IconWrapper>
      </TitleWrapper>
      {description && !descriptionHidden && (
        <Description onClick={onClick} visited={visited}>
          {truncateDesc(description)}
        </Description>
      )}
    </Wrapper>
  );
};

Article.propTypes = {
  _id: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  articleVisited: PropTypes.func.isRequired,
  articleHidden: PropTypes.func.isRequired,
  articleUnhidden: PropTypes.func.isRequired,
  articleBookmarked: PropTypes.func.isRequired,
  articleUnbookmarked: PropTypes.func.isRequired,
  description: PropTypes.string,
  visited: PropTypes.bool,
  bookmarked: PropTypes.bool,
  hidden: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  descriptionHidden: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, {
  articleVisited,
  articleHidden,
  articleUnhidden,
  articleBookmarked,
  articleUnbookmarked,
})(React.memo(Article));
