import { ManageReviewsTable, ManageReviewsWrapper } from "./styled";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, Edit, Eye, Play, Trash2 } from "feather-icons-react";
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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FilterBox from "~/components/FilterBox";

const ManageReviews = () => {
  const { t } = useTranslation(["search"]);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const { handleOpenModal, handleCloseModal } = useModalStore();
  const [sortValue, setSortValue] = useState<string[]>([]);
  const [statusValue, setStatusValue] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
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
      ...(sortValue.length > 0 ? { sort: sortValue.join(",") } : {}),
      ...(statusValue.length > 0 ? { status: statusValue } : {}),
    };
  }, [reviewPagination.limit, reviewPagination.page, sortValue, statusValue]);

  const { data, isPending } = useGetAllReviewQuery(params as any);

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

  const handleGetValueSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    const combinedValue = name + value;
    if (selectedValue === value) {
      setSelectedValue(null);
      setSortValue((prev) => prev.filter((item) => item !== combinedValue));
    } else {
      setSelectedValue(value);
      setSortValue((prev) => {
        const filtered = prev.filter((item) => !item.startsWith(name));
        if (selectedValue === value) return filtered;
        return [...filtered, combinedValue];
      });
    }
  };

  const handleGetValueStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setStatusValue((prev) => {
      const exits = prev.find((item) => item === value);
      if (exits) {
        return prev.filter((item) => item !== value);
      }
      return [...prev, value];
    });
  };

  return (
    <ManageReviewsWrapper>
      {isPending ? (
        <Skeleton style={{ minHeight: "8.76rem", marginBottom: "2rem" }} />
      ) : (
        <div className="heading">
          <h2>{t("Manage Reviews", { ns: "header" })}</h2>
        </div>
      )}
      {isPending ? (
        <Skeleton
          count={8}
          style={{ minHeight: "6.48rem", marginBottom: "1.6rem" }}
        />
      ) : (
        <ManageReviewsTable>
          <table>
            <thead>
              <tr>
                <th>{t("No.")}</th>
                <th style={{ width: "20%" }}>
                  <div className="space-between">
                    {t("Summary")}
                    <div className="ic-sort">
                      <label>
                        <input
                          type="checkbox"
                          name="summary"
                          value=":ASC"
                          hidden
                          onChange={handleGetValueSort}
                          checked={sortValue.includes("summary:ASC")}
                        />
                        <Play fill="#414042" />
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="summary"
                          value=":DESC"
                          hidden
                          onChange={handleGetValueSort}
                          checked={sortValue.includes("summary:DESC")}
                        />
                        <Play fill="#414042" />
                      </label>
                    </div>
                  </div>
                </th>
                <th>
                  <div className="space-between">
                    {t("Overall rating")}
                    <div className="ic-sort">
                      <label>
                        <input
                          type="checkbox"
                          name="rate"
                          value=":ASC"
                          hidden
                          onChange={handleGetValueSort}
                          checked={sortValue.includes("rate:ASC")}
                        />
                        <Play fill="#414042" />
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="rate"
                          value=":DESC"
                          hidden
                          onChange={handleGetValueSort}
                          checked={sortValue.includes("rate:DESC")}
                        />
                        <Play fill="#414042" />
                      </label>
                    </div>
                  </div>
                </th>
                <th>Email</th>
                <th style={{ width: "20%" }}>
                  <div className="space-between">
                    {t("Time.label")}
                    <FilterBox>
                      <>
                        <div className="space-between space-top">
                          {t("Created at")}
                          <div className="ic-sort">
                            <label>
                              <input
                                type="checkbox"
                                name="createdAt"
                                value=":ASC"
                                hidden
                                onChange={handleGetValueSort}
                                checked={sortValue.includes("createdAt:ASC")}
                              />
                              <Play fill="#414042" />
                            </label>
                            <label>
                              <input
                                type="checkbox"
                                name="createdAt"
                                value=":DESC"
                                hidden
                                onChange={handleGetValueSort}
                                checked={sortValue.includes("createdAt:DESC")}
                              />
                              <Play fill="#414042" />
                            </label>
                          </div>
                        </div>
                        <div className="space-between space-top">
                          {t("Updated at")}
                          <div className="ic-sort">
                            <label>
                              <input
                                type="checkbox"
                                name="updatedAt"
                                value=":ASC"
                                hidden
                                onChange={handleGetValueSort}
                                checked={sortValue.includes("updatedAt:ASC")}
                              />
                              <Play fill="#414042" />
                            </label>
                            <label>
                              <input
                                type="checkbox"
                                name="updatedAt"
                                value=":DESC"
                                hidden
                                onChange={handleGetValueSort}
                                checked={sortValue.includes("updatedAt:DESC")}
                              />
                              <Play fill="#414042" />
                            </label>
                          </div>
                        </div>
                      </>
                    </FilterBox>
                  </div>
                </th>
                <th className="space-between">
                  {t("Status")}{" "}
                  <FilterBox>
                    <>
                      <label className="label" htmlFor="show">
                        <input
                          type="checkbox"
                          id="show"
                          name="status"
                          value="Show"
                          hidden
                          className="input"
                          onChange={handleGetValueStatus}
                          checked={statusValue.includes("Show")}
                        />
                        <span className="text">{t("Show")}</span>
                      </label>
                      <label className="label" htmlFor="hide">
                        <input
                          type="checkbox"
                          id="hide"
                          name="status"
                          value="Hide"
                          hidden
                          className="input"
                          onChange={handleGetValueStatus}
                          checked={statusValue.includes("Hide")}
                        />
                        <span className="text">{t("Hide")}</span>
                      </label>
                      <label className="label" htmlFor="deleted">
                        <input
                          type="checkbox"
                          id="deleted"
                          name="status"
                          value="deleted"
                          hidden
                          className="input"
                          onChange={handleGetValueStatus}
                          checked={statusValue.includes("deleted")}
                        />
                        <span className="text">{t("Deleted")}</span>
                      </label>
                    </>
                  </FilterBox>
                </th>
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
                          <div className="stars">
                            {formatRating(review.rate)}
                          </div>
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
      )}
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
