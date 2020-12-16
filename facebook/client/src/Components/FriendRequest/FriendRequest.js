import {
  FriendsContainer,
  FriendInfo,
  RoundImage,
} from "./FriendRequest.components";
import { Button } from "reactstrap";

const FriendRequest = ({
  onClick,
  confirmFriend,
  declineFriend,
  from,
  _id,
}) => {
  return (
    <FriendsContainer onClick={(e) => onClick(e)} data-id={from._id}>
      <RoundImage src={from.profile_photo} />
      <FriendInfo className="w-100">
        <h4>{from.display_name || from.first_name + " " + from.last_name}</h4>
        <div className="d-flex w-100 align-items-center">
          <Button
            onClick={() => confirmFriend(_id)}
            color="primary"
            className="mr-2 w-100"
          >
            Confirm
          </Button>
          <Button
            onClick={() => declineFriend(_id)}
            className="w-100"
            color="secondary"
          >
            Delete
          </Button>
        </div>
      </FriendInfo>
    </FriendsContainer>
  );
};
export default FriendRequest;
