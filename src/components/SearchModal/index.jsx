import PropTypes from "prop-types";

export default function SearchModal({ onClose }) {
  const submitSearch = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id="my-modal"
      >
        <div className="relative top-20 mx-auto py-5 w-1/2 shadow-lg rounded-md bg-black space-y-2">
          <section className="flex items-center space-x-5 bg-black px-5">
            <ion-icon
              name="search"
              size="large"
              class="text-neutral-500"
            ></ion-icon>
            <input
              type="search"
              className="w-full text-xl bg-inherit outline-none py-2 placeholder-neutral-500"
              placeholder="Tìm kiếm theo tên, mã sinh viên..."
              onSubmit={submitSearch}
            />
            <button className="flex" onClick={onClose} type="button">
              <ion-icon
                name="close"
                size="large"
                class="text-neutral-500 hover:text-neutral-400"
              ></ion-icon>
            </button>
          </section>
          <section className="space-y-2">
            <h6 className="font-bold px-5">Lịch sử tìm kiếm</h6>
            <div className="flex flex-col flex-wrap space-y-2">
              <div className="py-5 text-xl flex items-center hover:bg-neutral-800">
                <p className="flex-grow px-5">Nguyễn Văn A</p>
                <button className="flex" type="button">
                  <ion-icon
                    name="close"
                    class="text-neutral-500 text-2xl px-5 hover:text-neutral-400"
                  ></ion-icon>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

SearchModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
