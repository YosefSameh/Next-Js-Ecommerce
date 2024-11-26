import Image from "next/image";

const Sale = () => {
  return (
    <div class="container">
      <div class="section4 d-flex justify-content-between  seale">
        <div class="imgeee">
          <Image
            className="w-100"
            width={1500}
            height={250}
            src="https://yosefsameh.github.io/Store-Vegetables/img/section-3-2.jpg"
            alt=""
          />
        </div>
        <div class="imgeee">
          <Image
            className="w-100"
            width={1500}
            height={250}
            src="https://yosefsameh.github.io/Store-Vegetables/img/section-3-1.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Sale;
