// Components
import { Tiptap } from "./MarkdownViewer/MarkdownViewer.slave.component";
import TitleComponent from "./Title/Title.slave.component";
import TagsComponent from "./Tags/Tags.slave.component";
import { PostCommentComponent } from "../..";
import ArticleSkeleton from "./ArticleSkeleton.slave.component";
import LikeButtonComponent from "./LikeButton/LikeButton.slave.component";

export default function ArticleComponent({
  postid,
  postDataError,
  commentsListError,
  postDataErrorMessage,
  commentsListErrorMessage,
  postDataStatusCode,
  commentsListStatusCode,
  postData,
  commentsList,
  getCommentsList,
  refreshPostData
}) {
  // Skeleton Loading
  if (!postDataStatusCode || !commentsListStatusCode) return <ArticleSkeleton />;
  // Rendering
  return (
    <div className="mt-10 flex flex-col w-full justify-center items-center">
      {postDataError ? <>{postDataStatusCode}/{postDataErrorMessage}</> :
      <>
      {/* Title */}
      <TitleComponent
        title={postData.title}
        createdAt={postData.createdAt}
        viewCounts={postData.viewCounts}
        categoryName={postData.categoryName}
        postId={postData.id}
        ownerId={postData.usersId}
      />
      <hr className="border-gray-200 w-full my-5 max-w-4xl" />
      {/* Markdown Contents */}
      <div className="flex flex-col max-w-4xl w-full mt-10">
        <Tiptap contentData={postData.markDownContent} />
      </div>
      <hr className="border-gray-200 w-full my-10" />
        
          <LikeButtonComponent
          postid={postid}
          isLiked={postData.isLiked}
          likeCount={postData.likes}
          refreshPostData={refreshPostData}
          />
         
      {/* Tags */}
      <TagsComponent tags={postData.TagData} />
      {/* Comments */}
      <PostCommentComponent postid={postid} commentsList={commentsList} getCommentsList={getCommentsList} />
      </>
      }
    </div>
  );
}
