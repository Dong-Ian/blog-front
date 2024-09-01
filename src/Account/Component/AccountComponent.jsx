import { Link } from "react-router-dom";

import styles from "../Style/account.module.css";

import githubIcon from "../../Utils/Asset/github-mark.png";
import instagramIcon from "../../Utils/Asset/instagram.webp";
import defaultProfileImg from "../../Utils/Asset/nullprofile.webp";
import linkImg from "../../Utils/Asset/link.png";

/**
 * 사용자의 정보를 보여주는 컴포넌트
 *
 * @param {Object} props - 컴포넌트에 전달되는 속성
 * @param {Object} props.userInfo - 사용자 정보 객체
 * @returns {JSX.Element} - 사용자 정보를 표시하는 UI
 */
function AccountComponent({ userInfo }) {
  const profileImg = userInfo.images.profileImage;

  /**
   * 사용자 프로필 및 설명을 렌더링
   *
   * @returns {JSX.Element} - 사용자 프로필 및 설명
   */
  function UserInfoRender() {
    return (
      <div className={styles.infoBox}>
        <div className={styles.profileWrapper}>
          <div className={styles.profileImgDiv}>
            {profileImg !== "" ? (
              <img alt="프로필 이미지" src={profileImg} />
            ) : (
              <img alt="기본 프로필 이미지" src={defaultProfileImg} />
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

  /**
   * 소셜 계정 정보를 렌더링
   *
   * @returns {JSX.Element} - 소셜 계정 정보
   */
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
            {userInfo.githubUrl ? (
              <Link to={githubUrl} style={{ textDecoration: "none" }}>
                <AccountRender img={githubIcon} account={userInfo.githubUrl} />
              </Link>
            ) : (
              <AccountRender img={githubIcon} account={userInfo.githubUrl} />
            )}
            {userInfo.instagram ? (
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

  /**
   * 소셜 계정 아이콘과 계정 이름을 렌더링
   *
   * @param {Object} props - 컴포넌트에 전달되는 속성
   * @param {string} props.img - 아이콘 이미지 URL
   * @param {string} props.account - 소셜 계정 이름
   * @returns {JSX.Element} - 소셜 계정 아이콘 및 이름
   */
  function AccountRender({ img, account }) {
    return (
      <div className={styles.socialAccountDiv}>
        <div className={styles.socialIconDiv}>
          <img alt="소셜 아이콘" src={img} />
        </div>
        <div className={styles.socialIdDiv}>
          {account ? (
            <p className={styles.social}>{account}</p>
          ) : (
            <p className={styles.nullSocial}>소셜 정보가 없습니다</p>
          )}
        </div>
      </div>
    );
  }

  /**
   * 이메일 정보를 렌더링
   *
   * @returns {JSX.Element} - 이메일 정보
   */
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

  /**
   * 개인 웹사이트 URL을 렌더링
   *
   * URL에 프로토콜이 없는 경우 자동으로 "https://"를 추가
   *
   * @returns {JSX.Element} - 개인 웹사이트 링크
   */
  function PersonalUrlRender() {
    /**
     * URL이 프로토콜을 포함하는지 확인
     *
     * @param {string} url - 확인할 URL
     * @returns {boolean} - 프로토콜이 포함되어 있는지 여부
     */
    const isUrlWithProtocol = (url) => {
      const pattern = /^(https?:\/\/)/i;
      return pattern.test(url);
    };

    /**
     * URL에서 도메인 부분을 추출
     *
     * @param {string} url - 도메인을 추출할 URL
     * @returns {string} - 도메인 또는 전체 URL
     */
    const getDomainFromUrl = (url) => {
      const domainRegex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/i;
      const match = url.match(domainRegex);
      if (match) {
        return match[1];
      }
      return url;
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
                  <img alt="링크 아이콘" src={linkImg} />
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
                  <img alt="링크 아이콘" src={linkImg} />
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

  return (
    <div className={styles.authorUserInfoBox}>
      <div className={styles.backgroundDiv}></div>
      <UserInfoRender />
      <div className={styles.table}>
        <EmailRender />
        <hr />
        <SocialAccountRnder />
        <hr />
        <PersonalUrlRender />
      </div>
    </div>
  );
}

export default AccountComponent;
