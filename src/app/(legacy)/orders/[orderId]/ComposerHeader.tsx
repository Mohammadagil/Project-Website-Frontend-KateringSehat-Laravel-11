"use client";

import Header from "@/components/Header";

function ComposerHeader() {
  return (
   <Header appendClassName="pt-16 bg-gray3 pb-20" title="My Order Details" back={{ historyBack: true }}  more={{ display: false }} thumbsUp={{ display: false }} />
  )
}

export default ComposerHeader