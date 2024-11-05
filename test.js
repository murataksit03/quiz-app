const startQuizButton = document.getElementById("start-quiz");
const loginContainer = document.getElementById("login-container");
const quizContainer = document.getElementById("quiz-container");
const resultsContainer = document.getElementById("results");

let currentQuestionIndex = 0; // Geçerli soru indeksini tutar
let correctAnswersCount = 0; // Doğru cevap sayısını tutar
let userAnswers = []; // Kullanıcının cevaplarını saklamak için bir dizi

// Sorular dizisi
const questions = [
  {
    question: "HTML nedir?",
    answers: {
      a: "Programlama dili",
      b: "İşaretleme dili",
      c: "Stil dosyası",
      d: "Veritabanı",
      e: "Sunucu",
    },
    correctAnswer: "b",
  },
  {
    question: "CSS ne için kullanılır?",
    answers: {
      a: "Sunucu ayarları yapmak için",
      b: "Veri depolamak için",
      c: "Web sayfası tasarımı yapmak için",
      d: "Programlama dili yazmak için",
      e: "Veritabanı bağlantıları kurmak için",
    },
    correctAnswer: "c",
  },
  {
    question: "JavaScript hangi alanda en yaygın olarak kullanılır?",
    answers: {
      a: "Sunucu taraflı işlemler",
      b: "Web tarayıcıları üzerinde dinamik içerikler oluşturmak",
      c: "Veri tabanı yönetimi",
      d: "Donanım programlama",
      e: "Grafik tasarım",
    },
    correctAnswer: "b",
  },
  {
    question: "Python dili en çok hangi alanda kullanılır?",
    answers: {
      a: "Web geliştirme",
      b: "Veri bilimi ve yapay zeka",
      c: "Veritabanı yönetimi",
      d: "Donanım programlama",
      e: "İşaretleme dili",
    },
    correctAnswer: "b",
  },
  {
    question: "SQL ne için kullanılır?",
    answers: {
      a: "Veritabanı yönetimi ve sorgulama işlemleri",
      b: "Web sayfası stil dosyaları oluşturmak için",
      c: "Sunucu kurmak için",
      d: "Programlama dili yazmak için",
      e: "Veri analizi yapmak için",
    },
    correctAnswer: "a",
  },
  {
    question: "GIT hangi amaçla kullanılır?",
    answers: {
      a: "Web sayfaları tasarlamak için",
      b: "Programlama dili öğrenmek için",
      c: "Versiyon kontrol sistemi olarak kod takibi yapmak için",
      d: "Veritabanı yönetimi için",
      e: "Grafik tasarım",
    },
    correctAnswer: "c",
  },
  {
    question: "Front-end geliştirme hangi dili içerir?",
    answers: {
      a: "HTML, CSS ve JavaScript",
      b: "Python ve Ruby",
      c: "Java ve C++",
      d: "PHP ve SQL",
      e: "Ruby ve SQL",
    },
    correctAnswer: "a",
  },
  {
    question: "Back-end geliştirme genellikle hangi dillerle yapılır?",
    answers: {
      a: "HTML ve CSS",
      b: "JavaScript ve SQL",
      c: "Python, Java ve PHP",
      d: "C ve C++",
      e: "Ruby ve C#",
    },
    correctAnswer: "c",
  },
  {
    question: "Hangisi bir framework değildir?",
    answers: {
      a: "Django",
      b: "React",
      c: "Vue",
      d: "JavaScript",
      e: "Angular",
    },
    correctAnswer: "d",
  },
  {
    question: "REST API nedir?",
    answers: {
      a: "Veritabanı bağlantı protokolü",
      b: "Front-end geliştirme aracı",
      c: "Web hizmetleri için bir mimari stil",
      d: "Grafik tasarım yazılımı",
      e: "Kullanıcı arayüz tasarımı",
    },
    correctAnswer: "c",
  },
];

// Sınav başlatma işlemi
startQuizButton.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const classInfo = document.getElementById("class").value;
  const studentId = document.getElementById("student-id").value;

  // Öğrenci numarasının geçerliliğini kontrol et
  const isValidStudentId = /^[1-9]\d{10}$/.test(studentId); // 0 ile başlamaz ve 11 hanelidir

  // Tüm alanların dolu olup olmadığını kontrol et
  if (!name || !surname || !classInfo || !studentId) {
    alert("Lütfen tüm bilgileri doldurun!");
  } else if (!isValidStudentId) {
    alert("Öğrenci numarası 11 haneli olmalı ve 0 ile başlayamaz.");
  } else {
    alert(
      "Sınav ekranına yönlendiriliyorsunuz ve süreniz geri sayıma başlayacaktır."
    );
    loginContainer.style.display = "none";
    quizContainer.style.display = "block";
    startQuiz();
  }
});

// Sınavı başlatma fonksiyonu
function startQuiz() {
  currentQuestionIndex = 0; // Sıfırdan başla
  correctAnswersCount = 0; // Doğru cevap sayısını sıfırla
  userAnswers = new Array(questions.length).fill(null); // Kullanıcı cevaplarını temizle
  showQuestion(currentQuestionIndex); // İlk soruyu göster
}

// Soruyu ekranda gösterme fonksiyonu
function showQuestion(index) {
  const question = questions[index];
  const quizElement = document.getElementById("quiz");

  // Soru ve cevap seçeneklerini oluştur
  const answers = Object.keys(question.answers)
    .map(
      (letter) => ` 
        <label class="answer-option">
          <input type="radio" name="question${index}" value="${letter}" ${
        userAnswers[index] === letter ? "checked" : ""
      }>
          ${letter}) ${question.answers[letter]}
        </label>`
    )
    .join("");

  quizElement.innerHTML = `
    <div class="question">${question.question}</div>
    <div class="answers">${answers}</div>
  `;

  // Butonları ayrı olarak ekle
  if (!document.getElementById("prev")) {
    quizElement.insertAdjacentHTML(
      "beforeend",
      `<button id="prev">Önceki Soru</button>` // Önceki Soru Butonu
    );
  }
  if (!document.getElementById("next")) {
    quizElement.insertAdjacentHTML(
      "beforeend",
      `<button id="next">Sonraki Soru</button>` // Sonraki Soru Butonu
    );
  }
  if (!document.getElementById("submit")) {
    quizElement.insertAdjacentHTML(
      "beforeend",
      `<button id="submit">Cevapları Gönder</button>` // Cevapları Gönder Butonu
    );
  }

  // Buton dinleyicileri
  document.getElementById("next").addEventListener("click", nextQuestion);
  document.getElementById("prev").addEventListener("click", previousQuestion); // Önceki Soru Butonuna dinleyici ekle
  document.getElementById("submit").addEventListener("click", showResults);
}

// Sonraki soruya geçiş işlemi
function nextQuestion() {
  const selected = document.querySelector(
    `input[name="question${currentQuestionIndex}"]:checked`
  );
  if (selected) {
    userAnswers[currentQuestionIndex] = selected.value; // Seçimi sakla
    if (selected.value === questions[currentQuestionIndex].correctAnswer) {
      correctAnswersCount++; // Doğruysa artır
    }
    currentQuestionIndex++; // Bir sonraki soruya geç
    if (currentQuestionIndex < questions.length) {
      showQuestion(currentQuestionIndex); // Bir sonraki soruyu göster
    } else {
      alert(
        "Tüm sorular tamamlandı, Cevapları Gönder butonuna basarak sınavı bitirebilirsiniz."
      );
    }
  } else {
    alert("Lütfen bir seçenek seçin!");
  }
}

// Önceki soruya dönüş işlemi
function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--; // Bir önceki soruya geç
    showQuestion(currentQuestionIndex); // Önceki soruyu göster
  } else {
    alert("Bu ilk soru, önceki soru yok.");
  }
}

// Sonuçları gösterme işlemi

// Sonuçları gösterme işlemi
function showResults() {
  const selected = document.querySelector(
    `input[name="question${currentQuestionIndex}"]:checked`
  );
  if (selected) {
    userAnswers[currentQuestionIndex] = selected.value; // Seçimi sakla
    if (selected.value === questions[currentQuestionIndex].correctAnswer) {
      correctAnswersCount++; // Doğruysa artır
    }
  }

  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const classInfo = document.getElementById("class").value;
  const studentId = document.getElementById("student-id").value;

  const resultMessage = `Toplam Doğru: ${correctAnswersCount} / ${questions.length}`;
  resultsContainer.innerHTML = ` 
    <h2>Sınav Sonuçları</h2>
    <p>Ad: ${name}</p>
    <p>Soyad: ${surname}</p>
    <p>Sınıf: ${classInfo}</p>
    <p>Öğrenci Numarası: ${studentId}</p>
    <p>${resultMessage}</p>
    <button id="confirm">Sınavı Tamamla</button>
  `;

  // Sınavı tamamlama onayı butonuna tıklama işlemi
  document.getElementById("confirm").addEventListener("click", () => {
    // Sınav bitirme onayı
    const confirmation = confirm("Sınavınızı bitirmek istiyor musunuz?");
    if (confirmation) {
      quizContainer.style.display = "none"; // Sınav ekranını gizle
      alert("Sınavınız başarıyla tamamlandı!");
      window.location.href = "test.html"; // Ana sayfaya yönlendir
    }
  });

  // Cevapları gönder butonuna basıldıktan sonra soruların seçimini devre dışı bırak
  disableQuiz();
}

// Soruları devre dışı bırakma işlemi
function disableQuiz() {
  const quizElement = document.getElementById("quiz");
  const inputs = quizElement.querySelectorAll("input[type='radio']");
  inputs.forEach((input) => {
    input.disabled = true; // Seçenekleri devre dışı bırak
  });

  // Önceki ve sonraki butonları gizle
  document.getElementById("prev").style.display = "none";
  document.getElementById("next").style.display = "none";
}
