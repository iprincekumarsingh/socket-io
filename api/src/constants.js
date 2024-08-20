// User Roles
export const UserRolesEnum = {
    USER: "user",
    ORGANIZER: "organizer",
    ADMIN: "admin",
  };
  
  export const AvailableUserRoles = Object.values(UserRolesEnum);
  
  // Plan Types
  export const PlanTypeEnum = {
    FREE: "FREE",
    PRO: "PRO",
  };
  
  // Payment Providers
  export const PaymentProviderEnum = {
    RAZORPAY: "RAZORPAY",
  };
  
  export const AvailablePaymentProviders = Object.values(PaymentProviderEnum);
  
  // Coupon Types
  export const CouponTypeEnum = {
    FLAT: "FLAT",
  };
  
  export const AvailableCouponTypes = Object.values(CouponTypeEnum);
  
  // Call Status
  export const CallStatusEnum = {
    PENDING: "pending",
    ACCEPTED: "accepted",
    REJECTED: "rejected",
    COMPLETED: "completed",
  };
  
  // Call Types
  export const CallTypeEnum = {
    VIDEO: "video",
    AUDIO: "audio",
  };
  
  // Database Name
  export const DB_NAME = "speakAmind";
  
  // Chat Events
  export const ChatEventEnum = Object.freeze({
    CONNECTED_EVENT: "connected",
    DISCONNECT_EVENT: "disconnect",
    JOIN_CHAT_EVENT: "joinChat",
    LEAVE_CHAT_EVENT: "leaveChat",
    UPDATE_GROUP_NAME_EVENT: "updateGroupName",
    MESSAGE_RECEIVED_EVENT: "messageReceived",
    NEW_CHAT_EVENT: "newChat",
    SOCKET_ERROR_EVENT: "socketError",
    STOP_TYPING_EVENT: "stopTyping",
    TYPING_EVENT: "typing",
    MESSAGE_DELETE_EVENT: "messageDeleted",
  });
  
  // Available Chat Events
  export const AvailableChatEvents = Object.values(ChatEventEnum);
  
  // Matching Events
  export const MatchEventEnum = Object.freeze({
    MATCH_FOUND_EVENT: "matchFound",    // Event when a match is found
    USER_MATCHED_EVENT: "userMatched",  // Event when users are matched
  });
  
  // Redis Key Patterns
  export const RedisKeys = {
    WAITING_USERS: 'waitingUsers:',     // Prefix for waiting users queue
    MATCHED_USERS: 'matchedUser:',     // Prefix for matched users queue
    TOPIC_ID: 'topicId:'                // Prefix for topic IDs
  };
  