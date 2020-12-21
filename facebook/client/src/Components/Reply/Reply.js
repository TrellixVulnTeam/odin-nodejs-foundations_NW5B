import moment from "moment";
import { useState, useEffect } from "react";
import {
  ReplyContainer,
  UserPhoto,
  ReplyBody,
  ReplyWrapper,
  ReplyFooter,
  FooterLink,
  LikesContainer,
  ReplyCount,
} from "./Reply.components";
import { Form, Input, Button, FormGroup } from "reactstrap";
import { AiFillLike } from "react-icons/ai";
import { BsArrow90DegDown } from "react-icons/bs";
import { ReplyForm } from "..";
import axios from "axios";

const Reply = ({
  level = 0,
  reply,
  replies,
  setReplies,
  comment,
  user,
  post,
}) => {
  const [showReplyForm, setShowReply] = useState(false);
  const [content, setContent] = useState(reply.content);
  const [showEdit, setEdit] = useState(false);

  const config = localStorage.getItem('user') && {
    headers: {
      Authorization: "bearer " + JSON.parse(localStorage.getItem("user")).token,
    },
  };

  const deleteHandler = () => {
    window.confirm(
      "Are you sure you want to delete this comment? This action cannot be undone."
    ) &&
      axios
        .delete(`/posts/${post._id}/comments/${reply._id}`, config)
        .then((res) => {
          setReplies(replies.filter((reply) => reply._id !== res.data._id));
        })
        .catch((err) => console.log(err));
  };

  const likeComment = () => {
    axios
      .post(`/posts/${post._id}/comments/${reply._id}`, {}, config)
      .then((res) => {
        setReplies(
          replies.map((reply) =>
            reply._id === res.data._id ? res.data : reply
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const editHandler = (e) => {
    e.preventDefault();
    axios
      .put(`/posts/${post._id}/comments/${reply._id}`, { content }, config)
      .then((res) => {
        setReplies(
          replies.map((reply) =>
            reply._id === res.data._id ? res.data : reply
          )
        );
        setEdit(false);
      })
      .catch((err) => console.log(err));
  };

  const onChangeHandler = (target) => {
    // Reset field height
    target.style.height = "inherit";

    // Get the computed styles for the element
    const computed = window.getComputedStyle(target);

    // Calculate the height
    const height =
      parseInt(computed.getPropertyValue("border-top-width"), 10) +
      parseInt(computed.getPropertyValue("padding-top"), 10) +
      target.scrollHeight +
      parseInt(computed.getPropertyValue("padding-bottom"), 10) +
      parseInt(computed.getPropertyValue("border-bottom-width"), 10);

    target.style.height = `${height}px`;
  };

  useEffect(() => {
    const textarea = document.querySelector("textarea");
    if (textarea) {
      onChangeHandler(textarea);
    }
  }, [showEdit]);

  return (
    <ReplyContainer>
      <UserPhoto className="mr-2" src={reply.user.profile_photo} />
      <ReplyWrapper className={"w-100"}>
        <ReplyBody>
          <h6 className="mb-0">
            {reply.user.display_name ||
              reply.user.first_name + " " + reply.user.last_name}
          </h6>
          {!showEdit ? (
            <p
              className="mb-0"
              dangerouslySetInnerHTML={{ __html: reply.content }}
            ></p>
          ) : (
            <Form onSubmit={(e) => editHandler(e)} className="w-100">
              <FormGroup>
                <Input
                  type="textarea"
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    onChangeHandler(e.target);
                  }}
                />
              </FormGroup>
              <FormGroup className="text-right mb-1">
                <Button color="primary" type="submit" size="sm">
                  Edit
                </Button>
              </FormGroup>
            </Form>
          )}
          {!showEdit && (
            <LikesContainer>
              <AiFillLike
                fill={
                  reply.likes.some((e) => e._id === user._id) ? "royalblue" : ""
                }
                size={12}
              />
              &nbsp;
              <p style={{ fontSize: "12px" }} className="d-inline-block mb-0">
                {reply.likes.length}
              </p>
            </LikesContainer>
          )}
        </ReplyBody>
        <ReplyFooter>
          <FooterLink
            color={
              reply.likes.some((e) => e._id === user._id)
                ? "royalblue"
                : "black"
            }
            onClick={() => likeComment()}
            bold
          >
            Like
          </FooterLink>
          {user._id === reply.user._id && (
            <FooterLink bold onClick={() => deleteHandler()} color="gray">
              <span style={{ color: "black" }}>&middot;&nbsp;&nbsp;</span>
              Delete
            </FooterLink>
          )}
          {user._id === reply.user._id && (
            <FooterLink bold onClick={() => setEdit(!showEdit)} color="gray">
              Edit
            </FooterLink>
          )}
          <FooterLink color="lightgray">
            {moment(reply.createdAt).fromNow()}
          </FooterLink>
        </ReplyFooter>
      </ReplyWrapper>
    </ReplyContainer>
  );
};

export default Reply;
