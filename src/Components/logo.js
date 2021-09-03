import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import DraftsIcon from "@material-ui/icons/Drafts";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FeedbackIcon from "@material-ui/icons/Feedback";

function Logo(props) {
  console.log(props);
  return (
    <>
      <GitHubIcon />
      <DraftsIcon />
      <LinkedInIcon />
      <FeedbackIcon />
    </>
  );
}

export default Logo;
