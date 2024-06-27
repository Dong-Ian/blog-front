import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Home/Page/HomePage";
import LoginPage from "./Login/Page/LoginPage";
import SignUpPage from "./SignUp/Page/SignUpPage";

import PostListPage from "./PostList/Page/PostListPage";
import PinnedPostListPage from "./PostList/Page/PinnedPostListPage";
import CategoryPostListPage from "./PostList/Page/CategoryPostListPage";
import TagPostListPage from "./PostList/Page/TagPostList";

import PostPage from "./Post/Page/PostPage";
import PostingPage from "./Posting/Page/PostingPage";

import AccountPage from "./Account/Page/AccountPage";
import AdminLandingPage from "./Admin/Page/AdminLandingPage";
import EditPostLandingPage from "./EditPost/Page/EditPostLandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignUpPage />} />

        <Route exact path="/postlist" element={<PostListPage />} />
        <Route exact path="/postlist/pinned" element={<PinnedPostListPage />} />
        <Route
          exact
          path="/postlist/category/:category"
          element={<CategoryPostListPage />}
        />
        <Route exact path="/postlist/tag/:tag" element={<TagPostListPage />} />

        <Route exact path="/post/:postSeq" element={<PostPage />} />
        <Route exact path="/posting" element={<PostingPage />} />
        <Route exact path="/edit/:postSeq" element={<EditPostLandingPage />} />

        <Route exact path="/account" element={<AccountPage />} />
        <Route exact path="/admin" element={<AdminLandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
