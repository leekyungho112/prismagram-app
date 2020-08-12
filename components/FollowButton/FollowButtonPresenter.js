import React from "react";
import Button from "../Button";

export default ({isFollowing, onPress}) => (

    <Button text={isFollowing ? "Unfollow" : "Follow"} onPress={onPress} />
)