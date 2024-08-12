import { Link } from "react-router-dom";

import styles from "../Style/account.module.css";

import githubIcon from "../../Utils/Asset/github-mark.png";
import instagramIcon from "../../Utils/Asset/instagram.webp";
import defaultProfileImg from "../../Utils/Asset/nullprofile.webp";
import linkImg from "../../Utils/Asset/link.png";

function AccountComponent({ userInfo }) {
  const profileImg = userInfo.images.profileImage;

  function UserInfoRender() {
    return (
      <div className={styles.infoBox}>
        <div className={styles.profileWrapper}>
          <div className={styles.profileImgDiv}>
            {profileImg !== "" ? (
              <img alt="" src={profileImg} />
            ) : (
              <img alt="" src={defaultProfileImg} />
            )}
          </div>
        </div>
        <div className={styles.infoContentBox}>
          <p className={styles.name}>{userInfo.userName}</p>
          <p className={styles.userDescription}>{userInfo.memo}</p>
        </div>
      </div>
    );
  }

  function SocialAccountRnder() {
    const githubUrl = "https://github.com/" + userInfo.githubUrl;
    const instagramUrl = "https://www.instagram.com/" + userInfo.instagram;

    return (
      <div className={styles.tableDiv}>
        <div>
          <div className={styles.tableTitleDiv}>
            <p>소셜 정보</p>
          </div>
          <div className={styles.socialTable}>
            {userInfo.github !== null ? (
              <Link to={githubUrl} style={{ textDecoration: "none" }}>
                <AccountRender img={githubIcon} account={userInfo.githubUrl} />
              </Link>
            ) : (
              <AccountRender img={githubIcon} account={userInfo.githubUrl} />
            )}
            {userInfo.instagram !== null ? (
              <Link to={instagramUrl} style={{ textDecoration: "none" }}>
                <AccountRender
                  img={instagramIcon}
                  account={"@" + userInfo.instagram}
                />
              </Link>
            ) : (
              <AccountRender img={instagramIcon} account={userInfo.instagram} />
            )}
          </div>
        </div>
      </div>
    );
  }

  function AccountRender({ img, account }) {
    return (
      <div className={styles.socialAccountDiv}>
        <div className={styles.socialIconDiv}>
          <img alt="" src={img} />
        </div>
        <div className={styles.socialIdDiv}>
          {account != null ? (
            <p className={styles.social}>{account}</p>
          ) : (
            <p className={styles.nullSocial}>소셜 정보가 없습니다</p>
          )}
        </div>
      </div>
    );
  }

  function EmailRender() {
    return (
      <div className={styles.tableDiv}>
        <div>
          <div className={styles.tableTitleDiv}>
            <p>이메일 정보</p>
          </div>
          <div className={styles.emailDiv}>
            <p>{userInfo.userEmail}</p>
          </div>
        </div>
      </div>
    );
  }

  function PersonalUrlRender() {
    const isUrlWithProtocol = (url) => {
      const pattern = /^(https?:\/\/)/i;
      return pattern.test(url);
    };

    const getDomainFromUrl = (url) => {
      // 정규식을 사용하여 도메인 부분을 추출
      const domainRegex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/i;
      const match = url.match(domainRegex);
      if (match) {
        return match[1]; // 도메인 부분 반환
      }
      return url; // 도메인 추출 실패 시 전체 URL 반환
    };

    return (
      <div className={styles.tableDiv}>
        <div>
          <div className={styles.tableTitleDiv}>
            <p>링크</p>
          </div>
          <div>
            {userInfo.personalUrl ? (
              !isUrlWithProtocol(userInfo.personalUrl) ? (
                <div className={styles.linkTableDiv}>
                  <img alt="" src={linkImg} />
                  <p
                    onClick={() => {
                      window.open("https://" + userInfo.personalUrl);
                    }}
                    className={styles.personalLink}
                  >
                    {getDomainFromUrl(userInfo.personalUrl)}
                  </p>
                </div>
              ) : (
                <div className={styles.linkTableDiv}>
                  <img alt="" src={linkImg} />
                  <p
                    onClick={() => {
                      window.open(userInfo.personalUrl);
                    }}
                    className={styles.personalLink}
                  >
                    {getDomainFromUrl(userInfo.personalUrl)}
                  </p>
                </div>
              )
            ) : (
              <p className={styles.nullSocial}>등록된 링크가 없습니다</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  function BackgroundImgRender() {
    // if (userInfo.images.backgroundImage == null) {
    //   return <div className={styles.nullImageDiv}></div>;
    // } else {
    //   return <img src={userInfo.images.backgroundImage} />;
    // }
  }

  return (
    <div className={styles.authorUserInfoBox}>
      <div className={styles.backgroundDiv}>
        <BackgroundImgRender />
      </div>
      <UserInfoRender />
      <div className={styles.table}>
        <EmailRender />
        <hr></hr>
        <SocialAccountRnder />
        <hr></hr>
        <PersonalUrlRender />
      </div>
    </div>
  );
}

export default AccountComponent;
