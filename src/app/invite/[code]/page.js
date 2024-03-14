"use client";

function InvitePage({ params }) {
  const inviteCode = params.code;
  return (
    <div>
      <p>Invite Code: {inviteCode}</p>
    </div>
  );
}

export default InvitePage;
