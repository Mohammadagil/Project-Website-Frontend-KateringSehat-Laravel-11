"use client";

import Header from "@/components/Header";

function ComposerHeader() {
  return (
   <Header appendClassName="pt-16 bg-gray3 pb-20" title="Your Informations " back={{ historyBack: true }}  more={{ display: true, onClick: () => {} }} thumbsUp={{ display: false }} />
  )
}

export default ComposerHeader