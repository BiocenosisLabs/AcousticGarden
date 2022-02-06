
export function Web3Login() {


        if (window.ethereum) {
            window.ethereum.request({method: 'eth_requestAccounts'});
            return <> </>
        }
        return <> </>

}
