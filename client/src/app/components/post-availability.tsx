"use client";
import React, { useEffect } from "react";

const PostAvailability = () => {
  const isRequestedAvailability = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/availability/isRequested/7efddacf-085b-416b-9fc4-7ecdb66de5cd"
      );

      const result = await response.json();

      console.log("Response", result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isRequestedAvailability();
  }, []);
  return <div>PostAvailability</div>;
};

export default PostAvailability;
