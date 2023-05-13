import React from "react";
import "./About.css";

const About = () => {
  return (
    <>
      <div className="About mt-5">
        <h1>About</h1>
        <hr className="hori-rule" />
        <div >
        <p className="About-para mb-5">
          Money does not buy happiness unless you spend your money on others.
          New studies have shown that if you spend money on others or give money
          to charity it will increase your happiness more than spending that
          money on yourself (The Guardian). Grassroots and crowdfunding
          campaigns have opened an approachable way for people to interact with
          causes that they want to support. Many people are skeptical to donate
          money to a foundation because they do not know where the money will
          end up entirely. This Charity Platform is similar to GoFundMe,
          allowing users to create a campaign. When donating money to a campaign
          there are small percentages of money going to GoFundMe, but not the
          Transparent Charity Platform. When an organizer pulls their money out
          of a campaign there is a heavy transaction fee through the bank for
          GoFundMe, but not the Charity Platform. Donators do not see where the
          money goes after their donation on GoFundMe, but the Charity Platform
          uses Blockchain Technology to solve this problem with the transparency
          of transactions
        </p>
        </div>
      </div>
    </>
  )
}

export default About;
