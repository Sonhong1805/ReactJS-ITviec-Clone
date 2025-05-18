import { ManageReviewsTable, ManageReviewsWrapper } from "./styled";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, Edit, Eye, Trash2, X } from "feather-icons-react";
import { useGetAllReviewQuery } from "~/hooks/useGetAllReviewQuery";
import { useReviewStore } from "~/stores/reviewStore";
import formatRating from "~/utils/formatRating";
import ratingFields from "~/constants/ratingFields";
import Pagination from "~/components/Pagination";
import { formatTime } from "~/utils/formatTime";
import { useModalStore } from "~/stores/modalStore";
import ModalView from "./ModalView";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";

const ManageReviews = () => {
  const { t } = useTranslation(["search"]);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const { handleOpenModal, handleCloseModal } = useModalStore();
  const {
    reviews,
    reviewPagination,
    handleSaveReviews,
    handleSaveReviewPagination,
  } = useReviewStore();

  const params = useMemo(() => {
    return {
      limit: reviewPagination.limit || 10,
      page: reviewPagination.page || 1,
    };
  }, [reviewPagination.limit, reviewPagination.page]);

  const { data, isPending } = useGetAllReviewQuery(params as Pagination);

  useEffect(() => {
    if (!isPending && data) {
      handleSaveReviews(data.data || []);
      handleSaveReviewPagination(data.pagination);
    }
  }, [data, isPending]);

  const handleOpenModalAction = (review: Review, modal: string) => {
    setSelectedReview(review);
    handleOpenModal(modal);
  };
  const handleCloseModalAction = useCallback((modal: string) => {
    setSelectedReview(null);
    handleCloseModal(modal);
  }, []);

  return (
    <ManageReviewsWrapper>
      <div className="heading">
        <h2>{t("Manage Reviews", { ns: "header" })}</h2>
      </div>
      <ManageReviewsTable>
        <table>
          <thead>
            <tr>
              <th>{t("No.")}</th>
              <th style={{ width: "20%" }}>{t("Summary")}</th>
              <th>{t("Overall rating")}</th>
              <th>Email</th>
              <th style={{ width: "20%" }}>{t("Time.label")}</th>
              <th>{t("Status")}</th>
              <th>{t("Actions")}</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <tr key={review.id}>
                  <td>
                    {(reviewPagination.page - 1) * reviewPagination.limit +
                      index +
                      1}
                  </td>
                  <td>
                    <p className="summary">{review.summary}</p>
                  </td>
                  <td>
                    <div className="rating">
                      <div className="box-star">
                        <div className="stars">{formatRating(review.rate)}</div>
                        <ul className="detail-rating">
                          {ratingFields.map((rate) => (
                            <li
                              className="detail-rating__item"
                              key={rate.value}>
                              <p className="detail-rating__label">
                                {t(rate.label)}
                              </p>
                              <div className="detail-rating__content">
                                <div className="detail-rating__stars">
                                  {formatRating((review as any)[rate.value])}
                                </div>
                                <p className="detail-rating__score">
                                  {(review as any)[rate.value]}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <div className="number">{review.rate}</div>
                        <ChevronDown stroke="#121212" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>{review.user.email}</p>
                  </td>
                  <td style={{ width: "20%" }}>
                    <div className="time">
                      <div className="time-label">
                        <span className="col-5">{t("Updated at")}:</span>
                        <span className="col-7 time-value">
                          {formatTime(review.updatedAt + "")}
                          <ChevronDown
                            color="#121212"
                            style={{ marginLeft: "4px" }}
                          />
                        </span>
                      </div>
                      <div className="time-detail">
                        {review.deletedAt && (
                          <p>
                            <span className="col-5">{t("Deleted at")}:</span>
                            <span className="col-7 time-value">
                              {formatTime(review.deletedAt + "", true)}
                            </span>
                          </p>
                        )}
                        <p>
                          <span className="col-5">{t("Updated at")}:</span>
                          <span className="col-7 time-value">
                            {formatTime(review.updatedAt + "", true)}
                          </span>
                        </p>
                        <p>
                          <span className="col-5">{t("Created at")}:</span>
                          <span className="col-7 time-value">
                            {formatTime(review.createdAt + "", true)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    {review.deletedAt ? (
                      <div className="status deleted">{t("Deleted")}</div>
                    ) : (
                      <>
                        {review.status === "Show" && (
                          <div className="status show">{t("Show")}</div>
                        )}
                        {review.status === "Hide" && (
                          <div className="status hide">{t("Hide")}</div>
                        )}
                      </>
                    )}
                  </td>
                  <td>
                    <div className="icons">
                      <Eye
                        color="#0ab305"
                        onClick={() => handleOpenModalAction(review, "view")}
                      />
                      <Edit
                        color="#ed1b2f"
                        onClick={() => handleOpenModalAction(review, "edit")}
                      />
                      {!review.deletedAt && (
                        <Trash2
                          color="#414042"
                          onClick={() =>
                            handleOpenModalAction(review, "delete")
                          }
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>
                  <div style={{ textAlign: "center" }}>
                    {t("No reviews available")}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </ManageReviewsTable>
      <ModalView
        selectedReview={selectedReview}
        onClose={() => handleCloseModalAction("view")}
      />
      <ModalEdit
        selectedReview={selectedReview}
        onClose={() => handleCloseModalAction("edit")}
      />
      <ModalDelete
        selectedReview={selectedReview}
        onClose={() => handleCloseModalAction("delete")}
      />
      {reviews.length > 0 && (
        <Pagination
          pagination={reviewPagination}
          onChangePagination={handleSaveReviewPagination}
        />
      )}
    </ManageReviewsWrapper>
  );
};

export default ManageReviews;
