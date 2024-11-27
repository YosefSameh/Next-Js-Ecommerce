import Image from "next/image";

const Blog = () => {
  return (
    <div className="container">
      <div className="section5" id="section5">
        <div className="d-flex justify-content-center align-items-center paragraf2 mb-5">
          <h2 className="fw-bold">From The Blog</h2>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4 ">
            <div className="">
              <Image
                src="https://yosefsameh.github.io/Store-Vegetables/img/section-4-1.jpg"
                alt="Image"
                width={370}
                height={250}
              />
            </div>
            <div className="mt-4">
              <h2 className="fs-5 fw-bold">Cooking tips make cooking simple</h2>
              <p className="pw mt-2 text-secondary">
                Sed quia non numquam modi tempora indunt ut labore et dolore
                magnam aliquam quaerat
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="">
              <Image
                src="https://yosefsameh.github.io/Store-Vegetables/img/section-4-2.jpg"
                alt="Image"
                width={370}
                height={250}
              />
            </div>
            <div className="mt-4">
              <h2 className="fs-5 fw-bold">
                6 ways to prepare breakfast for 30
              </h2>
              <p className="pw mt-2 text-secondary">
                Sed quia non numquam modi tempora indunt ut labore et dolore
                magnam aliquam quaerat
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="">
              <Image
                src="https://yosefsameh.github.io/Store-Vegetables/img/section-4-3.jpg"
                alt="Image"
                width={370}
                height={250}
              />
            </div>
            <div className="mt-4">
              <h2 className="fs-5 fw-bold">
                6 ways to prepare breakfast for 30
              </h2>
              <p className="pw mt-2 text-secondary">
                Sed quia non numquam modi tempora indunt ut labore et dolore
                magnam aliquam quaerat
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
