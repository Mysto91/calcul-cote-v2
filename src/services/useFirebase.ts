import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

interface FirebaseConfig {
  projectId: string
  privateKey: string
  clientEmail: string
}

export function firebaseInit (): void {
  const firebaseConfig: FirebaseConfig = {
    projectId: 'calcul-cote-v2',
    privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCS9KCFOCaD0aoL\nrFUPEyKkpR3fs1lkDfS/iJtaH16ECpqmDf6HCeEtzhcJyJ/KF8Qq87F5zGqT06zb\n+yMfXhAEsHS6df6lYM5m9skpypNWPVdKLEiglumQj7X47hgBDclSS+HV2w987cKi\nOzr+QWyfKkAfW3l/laZhEkgKEnsq34fm1UpcoanlIZwGDcGlRAPBDdY/1WUPDhXg\nUpryUpHQwc/HFlfd8ZM1u8K93w4D4PUh65rl0+RMdZVUmolB1BRaVT4Q2GeHcccD\nA/mJcdMkjaEdzrfZoC6IllaUQowADF24jkI11KWv0sCDnM/dlm6B4dOIIc4GwxF5\nne0E+4F1AgMBAAECggEACUB5cqmsUxQ6Hm4FFOPhhHgYv2KtOA1g4UYacbwT2UBJ\nqDatVZcbpCSbcrQ8yx5f7UxWWhKyiwgCk/7loS3s2D67upl/JK5JkFXtKEJmsEFA\nY50SHXoizkUd8cQbosVZbWL1nt8hxH27iTctaaB41DR2wQKjTZMAXJAoFOpA8tvz\nZ9zspefBUXU7/CLHBf8K6otjM36bn9l8RyBD1/dXI35J5Bo9YyhNy+OdI7YtAx+j\nKy7EYfMkASs6HjmFpCPOX2xIK3TnhD9Pk4bpMqRCr+PTcBHJcRdpy+xtkads7Jfu\nP7Qcez1hunm4NNAK7sHC4k4TrkpwtsDmZlpX/u9MKQKBgQDEBF5s2ABnVOSAs/La\nBDCuwfVzz61jCJ8O608zysi/TdfiqqCb29sjO+og//GmgJUXrFcoJEUdZpma1NLX\nmZOR5qSwvDBgnQFiGV+uody50i1fxFl/uPjMuazxikZOjZxs9FeIg7nkbJ/vB8hR\ncF466NJumGPbRt+zOWpWbHWI7wKBgQC/7N4T0YqZed42Kdoub+5rm06gzRzFMS0g\ne17MRj1QSb5Iyk2vQ6B93LGtMzxnzfV6wYcSygaHGIlBBFTrAiDVpAtpfAz6EByF\nABJwx7l/z8zgcNXK33P0B1v2WDmhF00kiP/9XZtgmreNsmop3vfSDuMYObFaSqVg\nCM+MltRz2wKBgGSfAYHKF9rzXyEaPq3fvMXY1xEOKKlPwaa88Dlb/VUGtq2qfSvE\n3mbl2Lf76qZYFzDBzTPT+o6vHma2nU0Djxc0WJJI6GSP9CfRcqaIfG//Dj+84VyJ\nLV6aacbL/m9Qjl33x/9R71js0eS4EAKONjDzVyJio8/qP+cWsBmRL3yNAoGAUBL0\naNJhAD2PT4vQotVCZRTsDjzlhwRIbqfqWlHn3OqXgGkfVkNh34FHhBq/VhPhGnFJ\n+LXfWVgMU9sJzu8ZYelKdZ0zENXOAFOSXgmGRGQfd3i8SiNGjobPgI04phRBtD+Q\nhlYasIh8kprgnk2Pmc1qRD4115UTQGkMpvx68UcCgYA9nDNgPFZCUK1SVOEXXSpo\n2dqw3Z2St/yJH56G2ZgaOiat8lnrN7YCUSna1X7i4ZSCJgOy4wTNVHjDOATqMvVW\nCArfenKcyDlhgDA88NHlJAAFeBUREOeqPAZp/4/4Px+ZICfEZH/rl7KgTMRtWlqq\nPEY/CYR//w/G1jAYdejfag==\n-----END PRIVATE KEY-----\n',
    clientEmail: 'firebase-adminsdk-r2f47@calcul-cote-v2.iam.gserviceaccount.com'
  }

  initializeApp(firebaseConfig)
}

export function storeImage (image: Blob | null): void {
  // @ts-expect-error test
  const storage = getStorage('calcul-cote-v2')

  storage.listBuckets()
    .then((buckets: any) => {
      console.log('Liste des buckets Firebase Storage :', buckets)
    })
    .catch((error: any) => {
      console.error('Erreur lors de la récupération de la liste des buckets Firebase Storage :', error)
    })
}
